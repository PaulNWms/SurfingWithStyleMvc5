module Incubator
open Common
open Germinator
open System.Collections.Generic
open System.Linq

let GetRetrograde (notes:(int<Midi> * string) seq) =
    Seq.toList (notes |> Seq.rev)
    
let GetInverse (key:int<Midi>) (mode:int list * int) (notes:(int<Midi> * string) seq) =
    let chromaticScale = GetChromaticScale key mode
    let notesInMode = (fst mode).Length
    let invertFunc (d:int<Degree>) = (modulo -((d |> int) - 1) notesInMode) + 1 |> LanguagePrimitives.Int32WithMeasure<Degree>
    let intervals = 
        GetScaleDegreesFromNotes key mode notes
        |> Seq.map invertFunc
        |> GetIntervals mode
    Seq.map (fun x -> if x > 0<Interval> then x - 12<Interval> else x) intervals
    |> GetMidiNumbers key
    |> GetNoteNames chromaticScale
    
let GetChromaticInverse (key:int<Midi>) (mode:int list * int) (notes:(int<Midi> * string) seq) (drone:int<Midi>) =
    let chromaticScale = GetChromaticScale key mode
    let invertFunc (note:int<Interval>) =
        let droneVec = drone - key |> int |> LanguagePrimitives.Int32WithMeasure<Interval>
        let noteVec = note - droneVec
        droneVec - noteVec
    GetIntervalsFromNotes key notes
    |> Seq.map invertFunc
    |> GetMidiNumbers key
    |> GetNoteNames chromaticScale

let GetTones (key:int<Midi>) (mode:int list * int) (notes:(int<Midi> * string) seq) (drone:int<Midi>) (op) =
    let chromaticScale = GetChromaticScale key mode
    let droneFreq = 
        let x = (modulo (drone - key |> int) 12) 
                |> LanguagePrimitives.Int32WithMeasure<Interval>
                |> GetMidiNumber key
        Midi.ConvertToHz(x)
    let toneFunc (note:int<Midi> * string) =
        let midi = fst note
        let noteFreq = Midi.ConvertToHz(midi)
        let freq = abs(op droneFreq noteFreq)
        let midi = Hz.ConvertToMidi(freq)
        let name = GetNoteName chromaticScale midi
        midi, name, freq
    Seq.map toneFunc notes

let GetSumTones (key:int<Midi>) (mode:int list * int) (notes:(int<Midi> * string) seq) (drone:int<Midi>) =
    GetTones key mode notes drone (+)

let GetDifferenceTones (key:int<Midi>) (mode:int list * int) (notes:(int<Midi> * string) seq) (drone:int<Midi>) =
    GetTones key mode notes drone (-)

let GetSmoothSequences (key:int<Midi>) (mode:int list * int) (notes:(int<Midi> * string) seq) =
    let chromaticScale = GetChromaticScale key mode
    let midi = Seq.map (fun n -> fst n) notes
    let originalSet = new HashSet<int>()
    originalSet.UnionWith(Seq.map (fun x -> modulo ((x |> int) - A0Midi) 12) midi)
    let commonTones = new Dictionary<int<Interval>,int>()
    for i = 1 to 11 do
        let transposedSet = new HashSet<int>()
        transposedSet.UnionWith(Seq.map (fun x -> modulo ((x |> int) - A0Midi + i) 12) midi)
        transposedSet.IntersectWith(originalSet)
        let i' = i |> LanguagePrimitives.Int32WithMeasure<Interval>
        commonTones.Add(i', transposedSet.Count)
    let commonTones = commonTones.OrderBy(fun x -> x.Value).Reverse()
    let commonTones = Seq.filter (fun (ct:KeyValuePair<int<Interval>,int>) -> ct.Value >= 2) commonTones
    let transposed = Seq.map (fun (ct:KeyValuePair<int<Interval>,int>) -> (Seq.map (fun m -> GetMidiNumber m ct.Key) midi), ct.Value) commonTones
    Seq.map (fun x -> (GetNoteNames chromaticScale (fst x)), (snd x)) transposed
    
