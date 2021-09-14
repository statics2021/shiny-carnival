window.onload = function () {
  const currentSupportLocale = [];
  const localeMap = {"af": "afrikaans", "sq": "albanian", "am": "amharic", "ar": "arabic", "hy": "armenian", "az": "azerbaijani", "eu": "basque", "be": "belarusian", "bn": "bengali", "bs": "bosnian", "bg": "bulgarian", "ca": "catalan", "ceb": "cebuano", "ny": "chichewa", "zh-cn": "chinese (simplified)", "zh-tw": "chinese (traditional)", "co": "corsican", "hr": "croatian", "cs": "czech", "da": "danish", "nl": "dutch", "en": "english", "eo": "esperanto", "et": "estonian", "tl": "filipino", "fi": "finnish", "fr": "french", "fy": "frisian", "gl": "galician", "ka": "georgian", "de": "german", "el": "greek", "gu": "gujarati", "ht": "haitian creole", "ha": "hausa", "haw": "hawaiian", "iw": "hebrew", "he": "hebrew", "hi": "hindi", "hmn": "hmong", "hu": "hungarian", "is": "icelandic", "ig": "igbo", "id": "indonesian", "ga": "irish", "it": "italian", "ja": "japanese", "jw": "javanese", "kn": "kannada", "kk": "kazakh", "km": "khmer", "ko": "korean", "ku": "kurdish (kurmanji)", "ky": "kyrgyz", "lo": "lao", "la": "latin", "lv": "latvian", "lt": "lithuanian", "lb": "luxembourgish", "mk": "macedonian", "mg": "malagasy", "ms": "malay", "ml": "malayalam", "mt": "maltese", "mi": "maori", "mr": "marathi", "mn": "mongolian", "my": "myanmar (burmese)", "ne": "nepali", "no": "norwegian", "or": "odia", "ps": "pashto", "fa": "persian", "pl": "polish", "pt": "portuguese", "pa": "punjabi", "ro": "romanian", "ru": "russian", "sm": "samoan", "gd": "scots gaelic", "sr": "serbian", "st": "sesotho", "sn": "shona", "sd": "sindhi", "si": "sinhala", "sk": "slovak", "sl": "slovenian", "so": "somali", "es": "spanish", "su": "sundanese", "sw": "swahili", "sv": "swedish", "tg": "tajik", "ta": "tamil", "te": "telugu", "th": "thai", "tr": "turkish", "uk": "ukrainian", "ur": "urdu", "ug": "uyghur", "uz": "uzbek", "vi": "vietnamese", "cy": "welsh", "xh": "xhosa", "yi": "yiddish", "yo": "yoruba", "zu": "zulu"}

  for (const key in localeMap) {
    currentSupportLocale.push(key);
  }
  function setLocale() {
    const locale = window.location.pathname.split('/')[1];
    if (currentSupportLocale.indexOf(locale) != -1) {
      sessionStorage.setItem('locale', locale);
      $('#dropdownMenuLink').html(localeMap[locale]);
      $('#localeMenuToggle').html(localeMap[locale]);
    } else {
      sessionStorage.setItem('locale', -1);
      $('#dropdownMenuLink').html(localeMap['en']);
      $('#localeMenuToggle').html(localeMap['en']);
    }
  }
  setLocale();
  $("#downloadbtn").click(async function () {

    var videourl = $("#videourl").val();
    if (!videourl){
      $(".blank-hint").show();
    }
    $(".loader-hint").show();
    $(".loader").show();
    $.ajax({
      url: "/tk-down/info?url="+videourl,
      type: "get",
      dataType: "json",
      success: function (res) {
          $(".loader-hint,.loader-hint,.loader").hide();
          $(".result-container").show();
          var title = res.title;
          var cover_img = res.cover_img;
          var video_url = res.video_url;
          var video_url_list = res.video_url_list;
          $("#video-thumbnail").attr("src",cover_img);
          $("#best-download-link").attr("href",video_url);
          $("#video-title").text(title);
          var  shtml = "";
          if (video_url_list.length>0) {
              for (var i=1;i<video_url_list.length;i++) {
                  shtml+='<div><a href="'+video_url_list[i]+'" rel="nofollow" target="_blank" id="best-download-link" download="Breaking" style="text-decoration: none;">'+
                          '<button class="btn btn-primary download-btn" id="best-download-btn">Without Watermark  Download '+(i+1)+'  </button></a><br></div>';
              }
          }
          $(".info-btn").append(shtml);
        }
    });
});

















}
