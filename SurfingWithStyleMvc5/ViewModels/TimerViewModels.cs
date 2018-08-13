using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Xml;

namespace SurfingWithStyleMvc5.ViewModels
{
    public class TimerViewModel
    {
        private TimeSpan timeRemaining;

        [DisplayName("Duration:")]
        [StringLength(20, MinimumLength = 1, ErrorMessage = "Format: (h:)mm(:ss)")]
        [RegularExpression(@"^(P((\d+)D)?T((\d+)H)?((\d+)M)?((\d+)S)?)$|^(((\d+):)?(\d+)(:(\d+))?)$", ErrorMessage = "Format: (h:)mm(:ss)")]
        public string FormattedDuration
        {
            get
            {
                if (timeRemaining.TotalHours >= 1)
                {
                    return string.Format( @"{0:h\:mm}", timeRemaining);
                }
                else
                {
                    return string.Format(@"{0}", (int)timeRemaining.TotalMinutes);
                }
            }

            set
            {
                SetDuration(value);
            }
        }

        public string FormattedDurationSeconds
        {
            get
            {
                return string.Format(
                    timeRemaining.TotalHours >= 1 ? @"{0:h\:mm\:ss}" : @"{0:m\:ss}",
                    timeRemaining);
            }
        }

        [DisplayName("Duration:")]
        [StringLength(20, MinimumLength = 1, ErrorMessage = "ISO 8601 duration format expected.")]
        [RegularExpression(@"^(P((\d+)D)?T((\d+)H)?((\d+)M)?((\d+)S)?)$|^(((\d+):)?(\d+)(:(\d+))?)$", ErrorMessage = "ISO 8601 duration format expected.")]
        public string Duration
        {
            get
            {
                return timeRemaining.ToString("'P'd'DT'h'H'm'M's'S'");
            }

            set
            {
                SetDuration(value);
            }
        }

        private void SetDuration(string duration)
        {
            Match match = Regex.Match(duration, @"^P((\d+)D)?T((\d+)H)?((\d+)M)?((\d+)S)?$", RegexOptions.IgnoreCase);

            if (match.Success)
            {
                timeRemaining = XmlConvert.ToTimeSpan(duration);
            }
            else
            {
                match = Regex.Match(duration, @"^((\d+):)?(\d+)(:(\d+))?$");

                if (match.Success)
                {
                    int hours = match.Groups[2].Value.Length > 0 ? Int32.Parse(match.Groups[2].Value) : 0;
                    int minutes = match.Groups[3].Value.Length > 0 ? Int32.Parse(match.Groups[3].Value) : 0;
                    int seconds = match.Groups[5].Value.Length > 0 ? Int32.Parse(match.Groups[5].Value) : 0;
                    int days = hours / 24;
                    hours %= 24;
                    timeRemaining = new TimeSpan(days, hours, minutes, seconds);
                }
                else
                {
                    timeRemaining = TimeSpan.Zero;
                }
            }

        }
    }
}