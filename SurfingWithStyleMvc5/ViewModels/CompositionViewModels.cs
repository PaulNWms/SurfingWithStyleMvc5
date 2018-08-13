using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Web.Script.Serialization;

namespace SurfingWithStyleMvc5.ViewModels
{
    public class CompositionViewModel
    {
        private string key;
        public string Key
        {
            get { return key; }
            set { drone = key = value; }
        }

        public string Mode { get; set; }
        public string Seed { get; set; }

        private string drone;
        public string Drone
        {
            get { return drone; }
            set { drone = value; }
        }

        [Display(Name = "Smooth Sequences")]
        public IEnumerable<MusicMaker.SmoothSequence> SmoothSequences { get; set; }
        public IEnumerable<MusicMaker.Note> Germ { get; set; }
        public IEnumerable<MusicMaker.Note> Retrograde { get; set; }
        public IEnumerable<MusicMaker.Note> Inverse { get; set; }
        public IEnumerable<MusicMaker.Note> ChromaticInverse { get; set; }
        public IEnumerable<MusicMaker.Tone> SumTones { get; set; }
        public IEnumerable<MusicMaker.Tone> DifferenceTones { get; set; }

        [Display(Name = "Germ")]
        public string GermDisplay
        {
            get
            {
                return DumpNotes(Germ);
            }
        }

        public string GermMidiDisplay
        {
            get
            {
                return DumpMidi(Germ);
            }
        }

        public string germJson;
        [Display(Name = "Germ")]
        public string GermJson {
            get { return germJson; }
            set
            {
                germJson = value;
                var serializer = new JavaScriptSerializer();
                Germ = serializer.Deserialize<IList<MusicMaker.Note>>(germJson);
            }
        }

        public IEnumerable<string> SmoothSequencesMidiDisplay()
        {
            while (SmoothSequences == null)
            {
                yield return null;
            }

            var e = SmoothSequences.GetEnumerator();

            while (e.MoveNext())
            {
                yield return DumpMidi(e.Current.Notes);
            }
        }

        [Display(Name = "Smooth Sequences")]
        public IEnumerable<string> SmoothSequencesDisplay()
        {
            while (SmoothSequences == null)
            {
                yield return null;
            }

            var e = SmoothSequences.GetEnumerator();

            while (e.MoveNext())
            {
                yield return e.Current.Common + ":" + DumpNotes(e.Current.Notes);
            }
        }

        public string RetrogradeMidiDisplay
        {
            get { return DumpMidi(Retrograde); }
        }

        [Display(Name = "Retrograde")]
        public string RetrogradeDisplay
        {
            get { return DumpNotes(Retrograde); }
        }

        public string InverseMidiDisplay
        {
            get { return DumpMidi(Inverse); }
        }

        [Display(Name = "Inverse")]
        public string InverseDisplay
        {
            get { return DumpNotes(Inverse); }
        }

        public string ChromaticInverseMidiDisplay
        {
            get { return DumpMidi(ChromaticInverse); }
        }

        [Display(Name = "Chromatic Inverse")]
        public string ChromaticInverseDisplay
        {
            get { return DumpNotes(ChromaticInverse); }
        }

        public string SumTonesMidiDisplay
        {
            get { return DumpMidi(SumTones); }
        }

        [Display(Name = "Sum Tones (Drone + Melody Note)")]
        public string SumTonesDisplay
        {
            get { return DumpNotes(SumTones); }
        }

        public string DifferenceTonesMidiDisplay
        {
            get { return DumpMidi(DifferenceTones); }
        }

        [Display(Name = "Difference Tones (Drone - Melody Note)")]
        public string DifferenceTonesDisplay
        {
            get { return DumpNotes(DifferenceTones); }
        }

        public CompositionViewModel()
        {
            Key = "C";
            Mode = "Major";
            Seed = string.Empty;
            Drone = "C";
            Germ = new List<MusicMaker.Note>();
        }

        private string DumpNotes(IEnumerable<MusicMaker.Note> notes)
        {
            if (notes == null)
            {
                return string.Empty;
            }

            StringBuilder display = new StringBuilder();

            foreach (var note in notes)
            {
                display.Append(note.Name);
                display.Append(" ");
            }

            return display.ToString();
        }

        private string DumpNotes(IEnumerable<MusicMaker.Tone> notes)
        {
            if (notes == null)
            {
                return string.Empty;
            }

            StringBuilder display = new StringBuilder();

            foreach (var note in notes)
            {
                int freq = (int)Math.Round(note.Freq);
                display.Append(freq);
                display.Append(":");
                display.Append(note.Name);
                display.Append(" ");
            }

            return display.ToString();
        }

        private static string DumpMidi(IEnumerable<MusicMaker.Note> notes)
        {
            if (notes == null)
            {
                return string.Empty;
            }

            StringBuilder midiSb = new StringBuilder();

            foreach (var note in notes)
            {
                byte midi = (byte)note.Midi;
                midiSb.Append(midi.ToString("X2"));
            }

            return midiSb.ToString();
        }

        private static string DumpMidi(IEnumerable<MusicMaker.Tone> notes)
        {
            if (notes == null)
            {
                return string.Empty;
            }

            StringBuilder midiSb = new StringBuilder();

            foreach (var note in notes)
            {
                byte midi = (byte)note.Midi;
                midiSb.Append(midi.ToString("X2"));
            }

            return midiSb.ToString();
        }
    }
}