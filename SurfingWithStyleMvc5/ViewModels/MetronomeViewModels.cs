using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Xml;

namespace SurfingWithStyleMvc5.ViewModels
{
    public class MetronomeRow
    {
        public string[] Tempo { get; set; }
        public string[] Seconds { get; set; }
        public string Exercise { get; set; }

        public MetronomeRow()
        {
            Tempo = new[] { "120" };
            Seconds = new[] { "120" };
            Exercise = string.Empty;
        }

        public MetronomeRow(string tempo, string seconds, string exercise)
        {
            Tempo = tempo.Split(new[] { '.' }, StringSplitOptions.RemoveEmptyEntries);
            Seconds = seconds.Split(new[] { '.' }, StringSplitOptions.RemoveEmptyEntries);
            Exercise = exercise;
        }
    }

    public class MetronomeViewModel
    {
        private IList<MetronomeRow> rows = new List<MetronomeRow>();

        public MetronomeViewModel()
        {
            Rest = 5;
            StartRoutineWithRest = true;
            StartExerciseWithCountIn = true;
            EndExerciseWithBell = true;
        }

        [DisplayName("Rest between exercises (sec.): ")]
        public int Rest { get; set; }

        public string RestString
        {
            get
            {
                return string.Format(@"{0}", Rest);
            }
            set
            {
                int seconds = 5;
                if (Int32.TryParse(value, out seconds))
                {
                    Rest = seconds;
                }
            }
        }

        [DisplayName("Start routine with a rest: ")]
        public bool StartRoutineWithRest { get; set; }

        public string StartRoutineWithRestString
        {
            get
            {
                return StartRoutineWithRest.ToString();
            }
            set
            {
                bool b = true;
                if (Boolean.TryParse(value, out b))
                {
                    StartRoutineWithRest = b;
                }
            }
        }

        [DisplayName("Start each exercise with a count-in: ")]
        public bool StartExerciseWithCountIn { get; set; }

        public string StartExerciseWithCountInString
        {
            get
            {
                return StartExerciseWithCountIn.ToString();
            }
            set
            {
                bool b = true;
                if (Boolean.TryParse(value, out b))
                {
                    StartExerciseWithCountIn = b;
                }
            }
        }

        [DisplayName("End each exercise with a bell: ")]
        public bool EndExerciseWithBell { get; set; }

        public string EndExerciseWithBellString
        {
            get
            {
                return EndExerciseWithBell.ToString();
            }
            set
            {
                bool b = true;
                if (Boolean.TryParse(value, out b))
                {
                    EndExerciseWithBell = b;
                }
            }
        }

        public IList<MetronomeRow> Rows
        {
            get
            {
                return rows;
            }

            set
            {
                rows = value;
            }
        }
    }
}