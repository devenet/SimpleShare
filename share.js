var links = document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
  links[i].addEventListener("click", function() {
    var method = this.getAttribute('href').substring(1);

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var result;
      var url = tabs[0].url;
      var title = tabs[0].title;

      switch(method) {
        case 'shaarli':
          if (!localStorage['shaarli.url']) {
            alert('Merci de configurer l\'URL du Shaarli.');
            break;
          }
          result = localStorage['shaarli.url'] + "/?post=" + url
            + "&title=" + title;
          break;

        case 'email':
          result = "mailto:?" + "subject=" + title + "&body=" + url;
          break;
      }

      if (result) {
        chrome.tabs.create({url: encodeURI(result)});
      }
    });
  });
}