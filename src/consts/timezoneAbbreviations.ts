const abbreviations: Record<string, string> = {
  'Acre Time': 'ACT',
  'Afghanistan Time': 'AFT',
  'Alaska Daylight Time': 'AKDT',
  'Alaska Standard Time': 'AKST',
  'Alma-Ata Time': 'ALMT',
  'Alpha Time Zone': 'A',
  'Amazon Summer Time': 'AMST',
  'Amazon Time': 'AMT',
  'Anadyr Summer Time': 'ANAST',
  'Anadyr Time': 'ANAT',
  'Anywhere on Earth': 'AoE',
  'Apia Time': 'WST',
  'Aqtobe Time': 'AQTT',
  'Arabia Daylight Time': 'ADT',
  'Arabia Standard Time': 'AST',
  'Arabian Time': 'AST',
  'Argentina Time': 'ART',
  'Armenia Summer Time': 'AMST',
  'Armenia Time': 'AMT',
  'Atlantic Daylight Time': 'ADT',
  'Atlantic Standard Time': 'AST',
  'Atlantic Time': 'AT',
  'Australian Central Daylight Time': 'ACDT',
  'Australian Central Standard Time': 'ACST',
  'Australian Central Time': 'ACT',
  'Australian Central Western Standard Time': 'ACWST',
  'Australian Eastern Daylight Time': 'AEDT',
  'Australian Eastern Standard Time': 'AEST',
  'Australian Eastern Time': 'AET',
  'Australian Western Daylight Time': 'AWDT',
  'Australian Western Standard Time': 'AWST',
  'Azerbaijan Summer Time': 'AZST',
  'Azerbaijan Time': 'AZT',
  'Azores Summer Time': 'AZOST',
  'Azores Time': 'AZOT',
  'Bangladesh Standard Time': 'BST',
  'Bhutan Time': 'BTT',
  'Bolivia Time': 'BOT',
  'Bougainville Standard Time': 'BST',
  'Brasilia Time': 'BRT',
  'Brasília Summer Time': 'BRST',
  'Brasília Time': 'BRT',
  'Bravo Time Zone': 'B',
  'British Summer Time': 'BST',
  'Brunei Darussalam Time': 'BNT',
  'Cape Verde Time': 'CVT',
  'Casey Time': 'CAST',
  'Cayman Islands Daylight Saving Time': 'CIDST',
  'Cayman Islands Standard Time': 'CIST',
  'Central Africa Time': 'CAT',
  'Central Daylight Time': 'CDT',
  'Central European Summer Time': 'CEST',
  'Central European Time': 'CET',
  'Central Indonesia Time': 'WITA',
  'Central Indonesian Time': 'WITA',
  'Central Standard Time': 'CST',
  'Central Time': 'CT',
  'Chamorro Standard Time': 'ChST',
  'Charlie Time Zone': 'C',
  'Chatham Island Daylight Time': 'CHADT',
  'Chatham Island Standard Time': 'CHAST',
  'Chatham Time': 'CHAST',
  'Chile Standard Time': 'CLT',
  'Chile Summer Time': 'CLST',
  'China Standard Time': 'CST',
  'Choibalsan Summer Time': 'CHOST',
  'Choibalsan Time': 'CHOT',
  'Christmas Island Time': 'CXT',
  'Chuuk Time': 'CHUT',
  'Cocos Islands Time': 'CCT',
  'Colombia Time': 'COT',
  'Cook Island Time': 'CKT',
  'Cook Islands Time': 'CKT',
  'Coordinated Universal Time': 'UTC',
  'Cuba Daylight Time': 'CDT',
  'Cuba Standard Time': 'CST',
  'Davis Time': 'DAVT',
  'Delta Time Zone': 'D',
  'Dumont-d\'Urville Time': 'DDUT',
  'Dumont-d’Urville Time': 'DDUT',
  'East Africa Time': 'EAT',
  'East Greenland Time': 'EGT',
  'East Kazakhstan Time': 'ALMT',
  'East Timor Time': 'TLT',
  'Easter Island Standard Time': 'EAST',
  'Easter Island Summer Time': 'EASST',
  'Eastern Africa Time': 'EAT',
  'Eastern Daylight Time': 'EDT',
  'Eastern European Summer Time': 'EEST',
  'Eastern European Time': 'EET',
  'Eastern Greenland Summer Time': 'EGST',
  'Eastern Indonesia Time': 'WIT',
  'Eastern Indonesian Time': 'WIT',
  'Eastern Standard Time': 'EST',
  'Eastern Time': 'ET',
  'Echo Time Zone': 'E',
  'Ecuador Time': 'ECT',
  'Falkland Island Time': 'FKT',
  'Falkland Islands Summer Time': 'FKST',
  'Falkland Islands Time': 'FKST',
  'Fernando de Noronha Time': 'FNT',
  'Fiji Summer Time': 'FJST',
  'Fiji Time': 'FJT',
  'Foxtrot Time Zone': 'F',
  'French Guiana Time': 'GFT',
  'French Southern & Antarctic Time': 'FSAT',
  'French Southern and Antarctic Time': 'TFT',
  'Further-Eastern European Time': 'FET',
  'Galapagos Time': 'GALT',
  'Gambier Time': 'GAMT',
  'Georgia Standard Time': 'GET',
  'Gilbert Island Time': 'GILT',
  'Gilbert Islands Time': 'GILT',
  'Golf Time Zone': 'G',
  'Greenwich Mean Time': 'GMT',
  'Gulf Standard Time': 'GST',
  'Guyana Time': 'GYT',
  'Hawaii Standard Time': 'HST',
  'Hawaii-Aleutian Daylight Time': 'HDT',
  'Hawaii-Aleutian Standard Time': 'HAST',
  'Hong Kong Time': 'HKT',
  'Hotel Time Zone': 'H',
  'Hovd Summer Time': 'HOVST',
  'Hovd Time': 'HOVT',
  'India Standard Time': 'IST',
  'India Time Zone': 'I',
  'Indian Chagos Time': 'IOT',
  'Indian Ocean Time': 'IOT',
  'Indochina Time': 'ICT',
  'Iran Daylight Time': 'IRDT',
  'Iran Standard Time': 'IRST',
  'Irish Standard Time': 'IST',
  'Irkutsk Summer Time': 'IRKST',
  'Irkutsk Time': 'IRKT',
  'Israel Daylight Time': 'IDT',
  'Israel Standard Time': 'IST',
  'Japan Standard Time': 'JST',
  'Kamchatka Summer Time': 'PETST',
  'Kamchatka Time': 'PETT',
  'Kilo Time Zone': 'K',
  'Korea Standard Time': 'KST',
  'Korean Time': 'KST',
  'Kosrae Time': 'KOST',
  'Krasnoyarsk Summer Time': 'KRAST',
  'Krasnoyarsk Time': 'KRAT',
  'Kuybyshev Time': 'KUYT',
  'Kyrgyzstan Time': 'KGT',
  'Lima Time Zone': 'L',
  'Line Islands Time': 'LINT',
  'Lord Howe Daylight Time': 'LHDT',
  'Lord Howe Standard Time': 'LHST',
  'Magadan Summer Time': 'MAGST',
  'Magadan Time': 'MAGT',
  'Malaysia Time': 'MYT',
  'Maldives Time': 'MVT',
  'Marquesas Time': 'MART',
  'Marshall Islands Time': 'MHT',
  'Mauritius Time': 'MUT',
  'Mawson Time': 'MAWT',
  'Mike Time Zone': 'M',
  'Moscow Daylight Time': 'MSD',
  'Moscow Standard Time': 'MSK',
  'Mountain Daylight Time': 'MDT',
  'Mountain Standard Time': 'MST',
  'Mountain Time': 'MT',
  'Myanmar Time': 'MMT',
  'Nauru Time': 'NRT',
  'Nepal Time': 'NPT',
  'New Caledonia Time': 'NCT',
  'New Zealand Daylight Time': 'NZDT',
  'New Zealand Standard Time': 'NZST',
  'Newfoundland Daylight Time': 'NDT',
  'Newfoundland Standard Time': 'NST',
  'Niue Time': 'NUT',
  'Norfolk Daylight Time': 'NFDT',
  'Norfolk Island Time': 'NFT',
  'Norfolk Time': 'NFT',
  'November Time Zone': 'N',
  'Novosibirsk Summer Time': 'NOVST',
  'Novosibirsk Time': 'NOVT',
  'Omsk Standard Time': 'OMST',
  'Omsk Summer Time': 'OMSST',
  'Oral Time': 'ORAT',
  'Oscar Time Zone': 'O',
  'Pacific Daylight Time': 'PDT',
  'Pacific Standard Time': 'PST',
  'Pacific Time': 'PT',
  'Pakistan Standard Time': 'PKT',
  'Palau Time': 'PWT',
  'Papa Time Zone': 'P',
  'Papua New Guinea Time': 'PGT',
  'Paraguay Summer Time': 'PYST',
  'Paraguay Time': 'PYT',
  'Peru Time': 'PET',
  'Petropavlovsk-Kamchatski Time': 'PETT',
  'Philippine Time': 'PHT',
  'Phoenix Island Time': 'PHOT',
  'Phoenix Islands Time': 'PHOT',
  'Pierre & Miquelon Daylight Time': 'PMDT',
  'Pierre & Miquelon Standard Time': 'PMST',
  'Pitcairn Standard Time': 'PST',
  'Pohnpei Standard Time': 'PONT',
  'Pyongyang Time': 'PYT',
  'Quebec Time Zone': 'Q',
  'Qyzylorda Time': 'QYZT',
  'Reunion Time': 'RET',
  'Romeo Time Zone': 'R',
  'Rothera Time': 'ROTT',
  'Réunion Time': 'RET',
  'Sakhalin Time': 'SAKT',
  'Samara Time': 'SAMT',
  'Samoa Standard Time': 'SST',
  'Seychelles Time': 'SCT',
  'Sierra Time Zone': 'S',
  'Singapore Time': 'SGT',
  'Solomon Islands Time': 'SBT',
  'South Africa Standard Time': 'SAST',
  'South Georgia Time': 'GST',
  'Srednekolymsk Time': 'SRET',
  'St. Pierre & Miquelon Time': 'PM',
  'Suriname Time': 'SRT',
  'Syowa Time': 'SYOT',
  'Tahiti Time': 'TAHT',
  'Taipei Time': 'TWT',
  'Tajikistan Time': 'TJT',
  'Tango Time Zone': 'T',
  'Tokelau Time': 'TKT',
  'Tonga Summer Time': 'TOST',
  'Tonga Time': 'TOT',
  'Turkey Time': 'TRT',
  'Turkmenistan Time': 'TMT',
  'Tuvalu Time': 'TVT',
  'Ulaanbaatar Summer Time': 'ULAST',
  'Ulaanbaatar Time': 'ULAT',
  'Uniform Time Zone': 'U',
  'Uruguay Summer Time': 'UYST',
  'Uruguay Time': 'UYT',
  'Uzbekistan Time': 'UZT',
  'Vanuatu Time': 'VUT',
  'Venezuela Time': 'VET',
  'Venezuelan Standard Time': 'VET',
  'Victor Time Zone': 'V',
  'Vladivostok Summer Time': 'VLAST',
  'Vladivostok Time': 'VLAT',
  'Vostok Time': 'VOST',
  'Wake Island Time': 'WAKT',
  'Wake Time': 'WAKT',
  'Wallis & Futuna Time': 'WFT',
  'Wallis and Futuna Time': 'WFT',
  'West Africa Summer Time': 'WAST',
  'West Africa Time': 'WAT',
  'West Greenland Time': 'WGT',
  'West Kazakhstan Time': 'AQTT',
  'West Samoa Time': 'WST',
  'Western Argentine Summer Time': 'WARST',
  'Western European Summer Time': 'WEST',
  'Western European Time': 'WET',
  'Western Greenland Summer Time': 'WGST',
  'Western Indonesia Time': 'WIB',
  'Western Indonesian Time': 'WIB',
  'Western Sahara Standard Time': 'WT',
  'Western Sahara Summer Time': 'WST',
  'Whiskey Time Zone': 'W',
  'X-ray Time Zone': 'X',
  'Yakutsk Summer Time': 'YAKST',
  'Yakutsk Time': 'YAKT',
  'Yankee Time Zone': 'Y',
  'Yap Time': 'YAPT',
  'Yekaterinburg Summer Time': 'YEKST',
  'Yekaterinburg Time': 'YEKT',
  'Yukon Time': 'YT',
  'Zulu Time Zone': 'Z',
}

export default abbreviations
