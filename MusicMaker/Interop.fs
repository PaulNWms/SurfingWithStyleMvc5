namespace MusicMaker
open System
open System.Collections.Generic
open Common
open Germinator
open Incubator

type Note(midi:int<Midi>, name:string) =
    let mutable m_midi = midi
    let mutable m_name = name
    member public this.Midi with get() = m_midi
                            and  set midi = m_midi <- midi
    member public this.Name with get() = m_name
                            and  set name = m_name <- name
    new((midi:int<Midi>, name:string)) = Note(midi, name)
    new() = Note(0<Midi>, "")


type Tone(midi:int<Midi>, name:string, freq:float<Hz>) =
    let mutable m_midi = midi
    let mutable m_name = name
    let mutable m_freq = freq
    member public this.Midi with get() = m_midi
                            and  set midi = m_midi <- midi
    member public this.Name with get() = m_name
                            and  set name = m_name <- name
    member public this.Freq with get() = m_freq
                            and  set freq = m_freq <- freq
    new((midi:int<Midi>, name:string, freq:float<Hz>)) = Tone(midi, name, freq)
    new() = Tone(0<Midi>, "", 0.0<Hz>)


type SmoothSequence(notes:Note seq, common:int) = 
    let mutable m_notes = List(notes)
    let mutable m_common = common

    member this.Notes with get() = m_notes
                      and  set notes = m_notes <- notes

    member this.Common with get() = m_common
                       and  set common = m_common <- common

    new((notes:Note seq, common:int)) = SmoothSequence(notes, common)
    new() = SmoothSequence(Seq.empty, 0)


type Germinator(key:string, mode:string, seed:string) = 
    let key' = GetNote key
    let mode' = GetMode mode
    let germ = 
        if (String.IsNullOrWhiteSpace(seed)) then
            Seq.empty
        else
            GetGerm key' mode' seed

    let mutable m_notes =
        germ
        |> Seq.map(fun note -> Note(note))
        |> List

    member this.Notes with get() = m_notes

    member this.Regerminate(key:string, mode:string, dirtyGerm:string) =
        Regerminate (GetNote key) (GetMode mode) dirtyGerm
        |> Seq.map(fun note -> Note(note))
        |> List

    new() = Germinator("C", "Major", "")


type Incubator(key:string, mode:string, notes:Note seq, drone:string) = 
    let key' = GetNote key
    let mode' = GetMode mode
    let drone' = GetNote drone //TODO
    let mutable m_notes = List(notes)

    let mutable m_noteTuples =
        notes
        |> Seq.map(fun (note:Note) -> (note.Midi, note.Name))
        |> List

    let mutable m_smoothSequences =
        GetSmoothSequences key' mode' m_noteTuples
        |> Seq.map(fun smooth -> 
            let notes = fst(smooth) |> Seq.map(fun note -> Note(note))
            let common = snd(smooth)
            SmoothSequence(notes, common))
        |> List

    let mutable m_retrograde =
        GetRetrograde m_noteTuples
        |> Seq.map(fun note -> Note(note))
        |> List

    let mutable m_inverse =
        GetInverse key' mode' m_noteTuples
        |> Seq.map(fun note -> Note(note))
        |> List

    let mutable m_chromaticInverse =
        GetChromaticInverse key' mode' m_noteTuples drone'
        |> Seq.map(fun note -> Note(note))
        |> List

    let mutable m_sumTones =
        GetSumTones key' mode' m_noteTuples drone'
        |> Seq.map(fun tone -> Tone(tone))
        |> List

    let mutable m_differenceTones =
        GetDifferenceTones key' mode' m_noteTuples drone'
        |> Seq.map(fun tone -> Tone(tone))
        |> List

    member this.Notes with get() = m_notes
                      and  set notes = m_notes <- notes

    member this.SmoothSequences with get() = m_smoothSequences
                                and  set notes = m_smoothSequences <- notes

    member this.Retrograde with get() = m_retrograde
                           and  set notes = m_retrograde <- notes

    member this.Inverse with get() = m_inverse
                        and  set notes = m_inverse <- notes

    member this.ChromaticInverse with get() = m_chromaticInverse
                                 and  set notes = m_chromaticInverse <- notes

    member this.SumTones with get() = m_sumTones
                         and  set notes = m_sumTones <- notes

    member this.DifferenceTones with get() = m_differenceTones
                                and  set notes = m_differenceTones <- notes

    new((key:string, mode:string, notes:Note seq, drone:string)) = Incubator(key, mode, notes, drone)

    new() = Incubator("C", "Major", Seq.empty, "C")
