module Germinator
open System
open System.Text.RegularExpressions
open Common

let Decipher (mode:int list * int) (text:string) =
    let scrubbedText = System.Text.RegularExpressions.Regex.Replace(text, @"[^a-zA-Z1-9]", "").ToUpper().ToCharArray()
    scrubbedText |> Seq.map (GetScaleDegree mode)

let GetGerm (key:int<Midi>) (mode:int list * int) (text:string) =
    let chromaticScale = GetChromaticScale key mode
    Decipher mode text
    |> GetIntervals mode
    |> GetMidiNumbers key
    |> GetNoteNames chromaticScale

let Regerminate (key:int<Midi>) (mode:int list * int) (dirtyGerm:string) =
    let chromaticScale = GetChromaticScale key mode
    let dirtyNotes = 
        if (String.IsNullOrWhiteSpace(dirtyGerm)) then
            [||]
        else
            dirtyGerm.Trim().Split()
    Seq.map (fun x -> GetNote x) dirtyNotes
    |> GetNoteNames chromaticScale