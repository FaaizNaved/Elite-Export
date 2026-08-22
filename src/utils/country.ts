
/**
 * Country helpers — the single source of truth for the country select and the
 * phone input.
 */

/**
 * `"CODE:DIAL:Name"` per country, space separated, wrapped for diffability.
 *
 * The names are a **snapshot** of `Intl.DisplayNames` for `en-IN`, not a
 * runtime lookup, and that is the whole point. Node and Chrome ship different
 * ICU data: the server rendered "Falkland Islands" while the browser rendered
 * "Falkland Islands (Islas Malvinas)", so React threw a hydration error and
 * rebuilt the entire form on `/contact` and `/buyer-enquiry`. Sort order
 * diverged for the same reason. Pinning the locale was not enough — the data
 * behind the locale differs between the two runtimes.
 *
 * Regenerate deliberately, never at runtime.
 */
const COUNTRY_TABLE =
  "AD:376:Andorra|AE:971:United Arab Emirates|AF:93:Afghanistan|AG:1:Antigua & Barbuda|" +
  "AI:1:Anguilla|AL:355:Albania|AM:374:Armenia|AO:244:Angola|AR:54:Argentina|" +
  "AS:1:American Samoa|AT:43:Austria|AU:61:Australia|AW:297:Aruba|AX:358:Åland Islands|" +
  "AZ:994:Azerbaijan|BA:387:Bosnia & Herzegovina|BB:1:Barbados|BD:880:Bangladesh|BE:32:Belgium|" +
  "BF:226:Burkina Faso|BG:359:Bulgaria|BH:973:Bahrain|BI:257:Burundi|BJ:229:Benin|" +
  "BL:590:St Barthélemy|BM:1:Bermuda|BN:673:Brunei|BO:591:Bolivia|BQ:599:Caribbean Netherlands|" +
  "BR:55:Brazil|BS:1:Bahamas|BT:975:Bhutan|BW:267:Botswana|BY:375:Belarus|BZ:501:Belize|" +
  "CA:1:Canada|CD:243:Congo - Kinshasa|CF:236:Central African Republic|" +
  "CG:242:Congo - Brazzaville|CH:41:Switzerland|CI:225:Côte d’Ivoire|CK:682:Cook Islands|" +
  "CL:56:Chile|CM:237:Cameroon|CN:86:China|CO:57:Colombia|CR:506:Costa Rica|CU:53:Cuba|" +
  "CV:238:Cape Verde|CW:599:Curaçao|CY:357:Cyprus|CZ:420:Czechia|DE:49:Germany|DJ:253:Djibouti|" +
  "DK:45:Denmark|DM:1:Dominica|DO:1:Dominican Republic|DZ:213:Algeria|EC:593:Ecuador|" +
  "EE:372:Estonia|EG:20:Egypt|ER:291:Eritrea|ES:34:Spain|ET:251:Ethiopia|FI:358:Finland|" +
  "FJ:679:Fiji|FK:500:Falkland Islands|FM:691:Micronesia|FO:298:Faroe Islands|FR:33:France|" +
  "GA:241:Gabon|GB:44:United Kingdom|GD:1:Grenada|GE:995:Georgia|GF:594:French Guiana|" +
  "GG:44:Guernsey|GH:233:Ghana|GI:350:Gibraltar|GL:299:Greenland|GM:220:Gambia|GN:224:Guinea|" +
  "GP:590:Guadeloupe|GQ:240:Equatorial Guinea|GR:30:Greece|GT:502:Guatemala|GU:1:Guam|" +
  "GW:245:Guinea-Bissau|GY:592:Guyana|HK:852:Hong Kong SAR China|HN:504:Honduras|HR:385:Croatia|" +
  "HT:509:Haiti|HU:36:Hungary|ID:62:Indonesia|IE:353:Ireland|IL:972:Israel|IM:44:Isle of Man|" +
  "IN:91:India|IQ:964:Iraq|IR:98:Iran|IS:354:Iceland|IT:39:Italy|JE:44:Jersey|JM:1:Jamaica|" +
  "JO:962:Jordan|JP:81:Japan|KE:254:Kenya|KG:996:Kyrgyzstan|KH:855:Cambodia|KI:686:Kiribati|" +
  "KM:269:Comoros|KN:1:St Kitts & Nevis|KP:850:North Korea|KR:82:South Korea|KW:965:Kuwait|" +
  "KY:1:Cayman Islands|KZ:7:Kazakhstan|LA:856:Laos|LB:961:Lebanon|LC:1:St Lucia|" +
  "LI:423:Liechtenstein|LK:94:Sri Lanka|LR:231:Liberia|LS:266:Lesotho|LT:370:Lithuania|" +
  "LU:352:Luxembourg|LV:371:Latvia|LY:218:Libya|MA:212:Morocco|MC:377:Monaco|MD:373:Moldova|" +
  "ME:382:Montenegro|MF:590:St Martin|MG:261:Madagascar|MH:692:Marshall Islands|" +
  "MK:389:North Macedonia|ML:223:Mali|MM:95:Myanmar (Burma)|MN:976:Mongolia|" +
  "MO:853:Macao SAR China|MP:1:Northern Mariana Islands|MQ:596:Martinique|MR:222:Mauritania|" +
  "MS:1:Montserrat|MT:356:Malta|MU:230:Mauritius|MV:960:Maldives|MW:265:Malawi|MX:52:Mexico|" +
  "MY:60:Malaysia|MZ:258:Mozambique|NA:264:Namibia|NC:687:New Caledonia|NE:227:Niger|" +
  "NF:672:Norfolk Island|NG:234:Nigeria|NI:505:Nicaragua|NL:31:Netherlands|NO:47:Norway|" +
  "NP:977:Nepal|NR:674:Nauru|NU:683:Niue|NZ:64:New Zealand|OM:968:Oman|PA:507:Panama|PE:51:Peru|" +
  "PF:689:French Polynesia|PG:675:Papua New Guinea|PH:63:Philippines|PK:92:Pakistan|" +
  "PL:48:Poland|PM:508:St Pierre & Miquelon|PR:1:Puerto Rico|PS:970:Palestinian Territories|" +
  "PT:351:Portugal|PW:680:Palau|PY:595:Paraguay|QA:974:Qatar|RE:262:Réunion|RO:40:Romania|" +
  "RS:381:Serbia|RU:7:Russia|RW:250:Rwanda|SA:966:Saudi Arabia|SB:677:Solomon Islands|" +
  "SC:248:Seychelles|SD:249:Sudan|SE:46:Sweden|SG:65:Singapore|SH:290:St Helena|SI:386:Slovenia|" +
  "SJ:47:Svalbard & Jan Mayen|SK:421:Slovakia|SL:232:Sierra Leone|SM:378:San Marino|" +
  "SN:221:Senegal|SO:252:Somalia|SR:597:Suriname|SS:211:South Sudan|ST:239:São Tomé & Príncipe|" +
  "SV:503:El Salvador|SX:1:Sint Maarten|SY:963:Syria|SZ:268:Eswatini|" +
  "TC:1:Turks & Caicos Islands|TD:235:Chad|TG:228:Togo|TH:66:Thailand|TJ:992:Tajikistan|" +
  "TK:690:Tokelau|TL:670:Timor-Leste|TM:993:Turkmenistan|TN:216:Tunisia|TO:676:Tonga|" +
  "TR:90:Türkiye|TT:1:Trinidad & Tobago|TV:688:Tuvalu|TW:886:Taiwan|TZ:255:Tanzania|" +
  "UA:380:Ukraine|UG:256:Uganda|US:1:United States|UY:598:Uruguay|UZ:998:Uzbekistan|" +
  "VA:39:Vatican City|VC:1:St Vincent & the Grenadines|VE:58:Venezuela|" +
  "VG:1:British Virgin Islands|VI:1:US Virgin Islands|VN:84:Vietnam|VU:678:Vanuatu|" +
  "WF:681:Wallis & Futuna|WS:685:Samoa|YE:967:Yemen|YT:262:Mayotte|ZA:27:South Africa|" +
  "ZM:260:Zambia|ZW:263:Zimbabwe";

export interface Country {
  /** ISO 3166-1 alpha-2. */
  code: string;
  name: string;
  /** International dialling prefix, without the leading `+`. */
  dialCode: string;
  /** Emoji flag, derived from the code — no image assets required. */
  flag: string;
}

/**
 * Emoji flag for an ISO country code.
 * Each letter maps to its regional indicator symbol, which browsers render as a flag.
 */
export function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .map((letter) => String.fromCodePoint(0x1f1e6 + letter.charCodeAt(0) - 65))
    .join("");
}

/** Every country, sorted by name. Byte-identical on server and client. */
export const COUNTRIES: readonly Country[] = COUNTRY_TABLE.split("|")
  .filter(Boolean)
  .map((entry) => {
    const [code, dialCode, ...rest] = entry.split(":");
    return { code, dialCode, name: rest.join(":"), flag: flagEmoji(code) };
  })
  // Plain codepoint compare, not `localeCompare` — collation is another thing
  // the two runtimes can disagree about, and the order has to be stable.
  .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

const NAME_BY_CODE = new Map(COUNTRIES.map((country) => [country.code, country.name]));

export function countryName(code: string): string {
  const upper = code.toUpperCase();
  return NAME_BY_CODE.get(upper) ?? upper;
}

export function findCountry(code: string): Country | undefined {
  return COUNTRIES.find((country) => country.code === code.toUpperCase());
}
