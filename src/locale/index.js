
import {addLocaleData,FormattedMessage} from 'react-intl';

import englishLocaleData from 'react-intl/locale-data/en';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';

addLocaleData([...en, ...fr, ...es]);

const app = {
    "en": {
      "home_page_title":"Home Page",
      "home_page_description": "Home Page Description",
      "sample_page1_title": "Sample Page 1",
      "sample_page1_description": "Sample Page 1 Description",
      "sample_page2_title": "Sample Page 2",
      "sample_page2_description": "Sample Page 2 Description"
    },
    "ja": {

    }
}

export default function LocaleData(lang){
  return app[lang]
}
