module Common
open System
open System.Text.RegularExpressions

let modulo n m = ((n % m) + m) % m
let log2 x = log(x) / log(2.0)
let strIEq (x:string) y = x.Equals(y, System.StringComparison.OrdinalIgnoreCase)

let A0Midi = 21
let A0Freq = 27.5

let SharpChromaticScale = ["A"; "A#"; "B"; "C"; "C#"; "D"; "D#"; "E"; "F"; "F#"; "G"; "G#"]
let FlatChromaticScale = ["A"; "Bb"; "B"; "C"; "Db"; "D"; "Eb"; "E"; "F"; "Gb"; "G"; "Ab"]
let Sharps = [0; -5; 2; -3; 4; -1; -6; 1; -4; 3; -2; 5]

let Major = ([0; 2; 4; 5; 7; 9; 11], 3)
let MajorPentatonic = ([0; 2; 4; 7; 9], 3)
let MajorBlues = ([0; 2; 3; 4; 7; 9], 3)
let Dorian = ([0; 2; 3; 5; 7; 9; 10], 1)
let Phrygian = ([0; 1; 3; 5; 7; 8; 10], -1)
let Lydian = ([0; 2; 4; 6; 7; 9; 11], 4)
let Mixolydian = ([0; 2; 4; 5; 7; 9; 10], 2)
let Minor = ([0; 2; 3; 5; 7; 8; 10], 0)
let HarmonicMinor = ([0; 2; 3; 5; 7; 8; 11], 0)
let MelodicMinor = ([0; 2; 3; 5; 7; 9; 11], 0)
let MinorPentatonic = ([0; 3; 5; 7; 10], 0)
let MinorBlues = ([0; 3; 5; 6; 7; 10], 0)
let Locrian = ([0; 1; 3; 5; 6; 8; 10], -2)
let Whole = ([0; 2; 4; 6; 8; 10], 0)
let Diminished = ([0; 2; 3; 5; 6; 8; 9; 11], 0)

[<Measure>]
type Hz =
    class
        static member ConvertToMidi(frequency:float<Hz>) = 
            A0Midi + (round(float(12.0 * log2((frequency |> float)/A0Freq))) |> int)
            |> LanguagePrimitives.Int32WithMeasure<Midi>
    end
and [<Measure>] Midi =
    class
        static member ConvertToHz(midiNumber:int<Midi>) =
            27.5 * 2.0**(float(int(midiNumber) - A0Midi)/12.0)
            |> LanguagePrimitives.FloatWithMeasure<Hz>
    end

let A0Midi' = A0Midi |> LanguagePrimitives.Int32WithMeasure<Midi>
let A0Freq' = A0Freq |> LanguagePrimitives.FloatWithMeasure<Hz>

[<Measure>]
type Interval

[<Measure>]
type Degree

let GetMidiNumber (key:int<Midi>) (interval:int<Interval>) =
    key + (interval |> int |> LanguagePrimitives.Int32WithMeasure<Midi>)

let GetMidiNumbers (key:int<Midi>) (intervals:int<Interval> seq) =
    intervals |> Seq.map (GetMidiNumber key)

let GetScaleDegree (mode:int list * int) (c:char) =
    let bass = 
        if (c >= '1' && c <= '9') then
            (int '1')
        else
            (int 'A')
    (modulo ((int c) - bass) (fst mode).Length) + 1 |> LanguagePrimitives.Int32WithMeasure<Degree>

let GetScaleDegreeFromNote (key:int<Midi>) (mode:int list * int) (note:int<Midi> * string) =
    let interval = (fst note) - key |> int |> LanguagePrimitives.Int32WithMeasure<Interval>
    let degree = 
        match List.tryFindIndex (fun x -> x = (int interval)) (fst mode) with
            | Some value -> value + 1
            | None -> 0
    degree |> LanguagePrimitives.Int32WithMeasure<Degree>

let GetScaleDegreesFromNotes (key:int<Midi>) (mode:int list * int) (notes:(int<Midi> * string) seq) =
    Seq.map (GetScaleDegreeFromNote key mode) notes

let ParseNote (noteParam:string) =
    let m = Regex.Match(noteParam, @"([a-gA-G][b#]?)(\d)?")
    if m.Success then
        let noteName = m.Groups.[1].Value
        let octave = 
            if m.Groups.[2].Value.Length > 0 then
                Int32.Parse(m.Groups.[2].Value)
            else
                3
        Some (noteName, octave)
    else
        None

let GetNote (noteParam:string) =
    let noteName, octave = 
        match ParseNote noteParam with
        | Some value -> value
        | None -> "R", -1
    let isEqual x = strIEq x noteName
    let note = 
        match List.tryFindIndex isEqual SharpChromaticScale with
        | Some value -> value
        | None ->
            match List.tryFindIndex isEqual FlatChromaticScale with
            | Some value -> value
            | None -> 0
    A0Midi + 12*octave + note |> LanguagePrimitives.Int32WithMeasure<Midi>

let GetMode (modeName:string) =
    match modeName.ToLower() with
    | "major" -> Major
    | "maj" -> Major
    | "majorpentatonic" -> MajorPentatonic
    | "majpent" -> MajorPentatonic
    | "majorblues" -> MajorBlues
    | "majblu" -> MajorBlues
    | "minor" -> Minor
    | "min" -> Minor
    | "m" -> Minor
    | "harmonicminor" -> HarmonicMinor
    | "harm" -> HarmonicMinor
    | "melodicminor" -> MelodicMinor
    | "mel" -> MelodicMinor
    | "minorpentatonic" -> MinorPentatonic
    | "minpent" -> MinorPentatonic
    | "minorblues" -> MinorBlues
    | "minblu" -> MinorBlues
    | "ionian" -> Major
    | "dorian" -> Dorian
    | "phrygian" -> Phrygian
    | "lydian" -> Lydian
    | "mixolydian" -> Mixolydian
    | "aeolian" -> Minor
    | "locrian" -> Locrian
    | "whole" -> Whole
    | "diminished" -> Diminished
    | "dim" -> Diminished
    | _ -> Major

let GetChromaticScale (key:int<Midi>) (mode:int list * int) =
    let modeSharps = snd mode
    let index = (modulo ((key |> int) - A0Midi) 12)
    let sharps = (modulo (Sharps.[index] + modeSharps) 12)
    if sharps < 6 then
        SharpChromaticScale
    else
        FlatChromaticScale

let GetInterval (mode:int list * int) (degree:int<Degree>) =
    let intervals = fst mode
    intervals.[(modulo ((degree |> int) - 1) intervals.Length)]
    |> LanguagePrimitives.Int32WithMeasure<Interval>
    
let GetIntervals (mode:int list * int) (degrees:int<Degree> seq) =
    let modeFunc = GetInterval mode
    degrees |> Seq.map modeFunc

let GetIntervalsFromNotes (key:int<Midi>) (notes:(int<Midi> * string) seq) =
    let intervalFunc n = (fst n) - key |> int |> LanguagePrimitives.Int32WithMeasure<Interval>
    notes |> Seq.map intervalFunc

let GetNoteName (chromaticScale:string list) (midi:int<Midi>) =
    if (midi >= A0Midi') then
        let index = (modulo ((midi |> int) - A0Midi) 12)
        chromaticScale.[index]
    else
        "R"

let GetNoteNames (chromaticScale:string list) (midiNumbers:int<Midi> seq) =
    let toNoteFunc (midi:int<Midi>) = midi, GetNoteName chromaticScale midi
    midiNumbers |> Seq.map toNoteFunc
