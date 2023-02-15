
import React from 'react';
import Form from 'react-bootstrap/Form';
import {useRef} from 'react'

/*export function CountrySelector(onSelect) {
    return <Form.Select className="border-light-01">
            <option role="option" value="" aria-selected="false" disabled="">Choose Country...</option>
            <option role="option" value="1149361" aria-selected="false">Afghanistan</option>
            <option role="option" value="661882" aria-selected="false">Åland</option>
            <option role="option" value="783754" aria-selected="false">Albania</option>
            <option role="option" value="2589581" aria-selected="false">Algeria</option>
            <option role="option" value="5880801" aria-selected="false">American Samoa</option>
            <option role="option" value="3041565" aria-selected="false">Andorra</option>
            <option role="option" value="3351879" aria-selected="false">Angola</option>
            <option role="option" value="3573511" aria-selected="false">Anguilla</option>
            <option role="option" value="6697173" aria-selected="false">Antarctica</option>
            <option role="option" value="3576396" aria-selected="false">Antigua and Barbuda</option>
            <option role="option" value="3865483" aria-selected="false">Argentina</option>
            <option role="option" value="174982" aria-selected="false">Armenia</option>
            <option role="option" value="3577279" aria-selected="false">Aruba</option>
            <option role="option" value="2077456" aria-selected="false">Australia</option>
            <option role="option" value="2782113" aria-selected="false">Austria</option>
            <option role="option" value="587116" aria-selected="false">Azerbaijan</option>
            <option role="option" value="3572887" aria-selected="false">Bahamas</option>
            <option role="option" value="290291" aria-selected="false">Bahrain</option>
            <option role="option" value="1210997" aria-selected="false">Bangladesh</option>
            <option role="option" value="3374084" aria-selected="false">Barbados</option>
            <option role="option" value="2802361" aria-selected="false">Belgium</option>
            <option role="option" value="3582678" aria-selected="false">Belize</option>
            <option role="option" value="2395170" aria-selected="false">Benin</option>
            <option role="option" value="3573345" aria-selected="false">Bermuda</option>
            <option role="option" value="1252634" aria-selected="false">Bhutan</option>
            <option role="option" value="3923057" aria-selected="false">Bolivia</option>
            <option role="option" value="7626844" aria-selected="false">Bonaire</option>
            <option role="option" value="3277605" aria-selected="false">Bosnia and Herzegovina</option>
            <option role="option" value="933860" aria-selected="false">Botswana</option>
            <option role="option" value="3371123" aria-selected="false">Bouvet Island</option>
            <option role="option" value="3469034" aria-selected="false">Brazil</option>
            <option role="option" value="1282588" aria-selected="false">British Indian Ocean Territory</option>
            <option role="option" value="3577718" aria-selected="false">British Virgin Islands</option>
            <option role="option" value="1820814" aria-selected="false">Brunei</option>
            <option role="option" value="732800" aria-selected="false">Bulgaria</option>
            <option role="option" value="2361809" aria-selected="false">Burkina Faso</option>
            <option role="option" value="433561" aria-selected="false">Burundi</option>
            <option role="option" value="1831722" aria-selected="false">Cambodia</option>
            <option role="option" value="2233387" aria-selected="false">Cameroon</option>
            <option role="option" value="6251999" aria-selected="false">Canada</option>
            <option role="option" value="3374766" aria-selected="false">Cape Verde</option>
            <option role="option" value="3580718" aria-selected="false">Cayman Islands</option>
            <option role="option" value="239880" aria-selected="false">Central African Republic</option>
            <option role="option" value="2434508" aria-selected="false">Chad</option>
            <option role="option" value="3895114" aria-selected="false">Chile</option>
            <option role="option" value="1814991" aria-selected="false">China</option>
            <option role="option" value="2078138" aria-selected="false">Christmas Island</option>
            <option role="option" value="1547376" aria-selected="false">Cocos [Keeling] Islands</option>
            <option role="option" value="3686110" aria-selected="false">Colombia</option>
            <option role="option" value="921929" aria-selected="false">Comoros</option>
            <option role="option" value="1899402" aria-selected="false">Cook Islands</option>
            <option role="option" value="3624060" aria-selected="false">Costa Rica</option>
            <option role="option" value="3202326" aria-selected="false">Croatia</option>
            <option role="option" value="7626836" aria-selected="false">Curacao</option>
            <option role="option" value="146669" aria-selected="false">Cyprus</option>
            <option role="option" value="3077311" aria-selected="false">Czech Republic</option>
            <option role="option" value="203312" aria-selected="false">Democratic Republic of the Congo</option>
            <option role="option" value="2623032" aria-selected="false">Denmark</option>
            <option role="option" value="223816" aria-selected="false">Djibouti</option>
            <option role="option" value="3575830" aria-selected="false">Dominica</option>
            <option role="option" value="3508796" aria-selected="false">Dominican Republic</option>
            <option role="option" value="1966436" aria-selected="false">East Timor</option>
            <option role="option" value="3658394" aria-selected="false">Ecuador</option>
            <option role="option" value="357994" aria-selected="false">Egypt</option>
            <option role="option" value="3585968" aria-selected="false">El Salvador</option>
            <option role="option" value="2309096" aria-selected="false">Equatorial Guinea</option>
            <option role="option" value="338010" aria-selected="false">Eritrea</option>
            <option role="option" value="453733" aria-selected="false">Estonia</option>
            <option role="option" value="337996" aria-selected="false">Ethiopia</option>
            <option role="option" value="3474414" aria-selected="false">Falkland Islands</option>
            <option role="option" value="2622320" aria-selected="false">Faroe Islands</option>
            <option role="option" value="2205218" aria-selected="false">Fiji</option>
            <option role="option" value="660013" aria-selected="false">Finland</option>
            <option role="option" value="3017382" aria-selected="false">France</option>
            <option role="option" value="3381670" aria-selected="false">French Guiana</option>
            <option role="option" value="4030656" aria-selected="false">French Polynesia</option>
            <option role="option" value="1546748" aria-selected="false">French Southern Territories</option>
            <option role="option" value="2400553" aria-selected="false">Gabon</option>
            <option role="option" value="2413451" aria-selected="false">Gambia</option>
            <option role="option" value="614540" aria-selected="false">Georgia</option>
            <option role="option" value="2921044" aria-selected="false">Germany</option>
            <option role="option" value="2300660" aria-selected="false">Ghana</option>
            <option role="option" value="2411586" aria-selected="false">Gibraltar</option>
            <option role="option" value="390903" aria-selected="false">Greece</option>
            <option role="option" value="3425505" aria-selected="false">Greenland</option>
            <option role="option" value="3580239" aria-selected="false">Grenada</option>
            <option role="option" value="3579143" aria-selected="false">Guadeloupe</option>
            <option role="option" value="4043988" aria-selected="false">Guam</option>
            <option role="option" value="3595528" aria-selected="false">Guatemala</option>
            <option role="option" value="3042362" aria-selected="false">Guernsey</option>
            <option role="option" value="2420477" aria-selected="false">Guinea</option>
            <option role="option" value="2372248" aria-selected="false">Guinea-Bissau</option>
            <option role="option" value="3378535" aria-selected="false">Guyana</option>
            <option role="option" value="3723988" aria-selected="false">Haiti</option>
            <option role="option" value="1547314" aria-selected="false">Heard Island and McDonald Islands</option>
            <option role="option" value="3608932" aria-selected="false">Honduras</option>
            <option role="option" value="1819730" aria-selected="false">Hong Kong</option>
            <option role="option" value="719819" aria-selected="false">Hungary</option>
            <option role="option" value="2629691" aria-selected="false">Iceland</option>
            <option role="option" value="1269750" aria-selected="false">India</option>
            <option role="option" value="1643084" aria-selected="false">Indonesia</option>
            <option role="option" value="99237" aria-selected="false">Iraq</option>
            <option role="option" value="2963597" aria-selected="false">Ireland</option>
            <option role="option" value="3042225" aria-selected="false">Isle of Man</option>
            <option role="option" value="294640" aria-selected="false">Israel</option>
            <option role="option" value="3175395" aria-selected="false">Italy</option>
            <option role="option" value="2287781" aria-selected="false">Ivory Coast</option>
            <option role="option" value="3489940" aria-selected="false">Jamaica</option>
            <option role="option" value="1861060" aria-selected="false">Japan</option>
            <option role="option" value="3042142" aria-selected="false">Jersey</option>
            <option role="option" value="248816" aria-selected="false">Jordan</option>
            <option role="option" value="1522867" aria-selected="false">Kazakhstan</option>
            <option role="option" value="192950" aria-selected="false">Kenya</option>
            <option role="option" value="4030945" aria-selected="false">Kiribati</option>
            <option role="option" value="831053" aria-selected="false">Kosovo</option>
            <option role="option" value="285570" aria-selected="false">Kuwait</option>
            <option role="option" value="1527747" aria-selected="false">Kyrgyzstan</option>
            <option role="option" value="1655842" aria-selected="false">Laos</option>
            <option role="option" value="458258" aria-selected="false">Latvia</option>
            <option role="option" value="272103" aria-selected="false">Lebanon</option>
            <option role="option" value="932692" aria-selected="false">Lesotho</option>
            <option role="option" value="2275384" aria-selected="false">Liberia</option>
            <option role="option" value="2215636" aria-selected="false">Libya</option>
            <option role="option" value="3042058" aria-selected="false">Liechtenstein</option>
            <option role="option" value="597427" aria-selected="false">Lithuania</option>
            <option role="option" value="2960313" aria-selected="false">Luxembourg</option>
            <option role="option" value="1821275" aria-selected="false">Macao</option>
            <option role="option" value="718075" aria-selected="false">Macedonia</option>
            <option role="option" value="1062947" aria-selected="false">Madagascar</option>
            <option role="option" value="927384" aria-selected="false">Malawi</option>
            <option role="option" value="1733045" aria-selected="false">Malaysia</option>
            <option role="option" value="1282028" aria-selected="false">Maldives</option>
            <option role="option" value="2453866" aria-selected="false">Mali</option>
            <option role="option" value="2562770" aria-selected="false">Malta</option>
            <option role="option" value="2080185" aria-selected="false">Marshall Islands</option>
            <option role="option" value="3570311" aria-selected="false">Martinique</option>
            <option role="option" value="2378080" aria-selected="false">Mauritania</option>
            <option role="option" value="934292" aria-selected="false">Mauritius</option>
            <option role="option" value="1024031" aria-selected="false">Mayotte</option>
            <option role="option" value="3996063" aria-selected="false">Mexico</option>
            <option role="option" value="2081918" aria-selected="false">Micronesia</option>
            <option role="option" value="617790" aria-selected="false">Moldova</option>
            <option role="option" value="2993457" aria-selected="false">Monaco</option>
            <option role="option" value="2029969" aria-selected="false">Mongolia</option>
            <option role="option" value="3194884" aria-selected="false">Montenegro</option>
            <option role="option" value="3578097" aria-selected="false">Montserrat</option>
            <option role="option" value="2542007" aria-selected="false">Morocco</option>
            <option role="option" value="1036973" aria-selected="false">Mozambique</option>
            <option role="option" value="1327865" aria-selected="false">Myanmar [Burma]</option>
            <option role="option" value="3355338" aria-selected="false">Namibia</option>
            <option role="option" value="2110425" aria-selected="false">Nauru</option>
            <option role="option" value="1282988" aria-selected="false">Nepal</option>
            <option role="option" value="2750405" aria-selected="false">Netherlands</option>
            <option role="option" value="2139685" aria-selected="false">New Caledonia</option>
            <option role="option" value="2186224" aria-selected="false">New Zealand</option>
            <option role="option" value="3617476" aria-selected="false">Nicaragua</option>
            <option role="option" value="2440476" aria-selected="false">Niger</option>
            <option role="option" value="2328926" aria-selected="false">Nigeria</option>
            <option role="option" value="4036232" aria-selected="false">Niue</option>
            <option role="option" value="2155115" aria-selected="false">Norfolk Island</option>
            <option role="option" value="4041468" aria-selected="false">Northern Mariana Islands</option>
            <option role="option" value="3144096" aria-selected="false">Norway</option>
            <option role="option" value="286963" aria-selected="false">Oman</option>
            <option role="option" value="1168579" aria-selected="false">Pakistan</option>
            <option role="option" value="1559582" aria-selected="false">Palau</option>
            <option role="option" value="6254930" aria-selected="false">Palestine</option>
            <option role="option" value="3703430" aria-selected="false">Panama</option>
            <option role="option" value="2088628" aria-selected="false">Papua New Guinea</option>
            <option role="option" value="3437598" aria-selected="false">Paraguay</option>
            <option role="option" value="3932488" aria-selected="false">Peru</option>
            <option role="option" value="1694008" aria-selected="false">Philippines</option>
            <option role="option" value="4030699" aria-selected="false">Pitcairn Islands</option>
            <option role="option" value="798544" aria-selected="false">Poland</option>
            <option role="option" value="2264397" aria-selected="false">Portugal</option>
            <option role="option" value="4566966" aria-selected="false">Puerto Rico</option>
            <option role="option" value="289688" aria-selected="false">Qatar</option>
            <option role="option" value="2260494" aria-selected="false">Republic of the Congo</option>
            <option role="option" value="935317" aria-selected="false">Réunion</option>
            <option role="option" value="798549" aria-selected="false">Romania</option>
            <option role="option" value="49518" aria-selected="false">Rwanda</option>
            <option role="option" value="3578476" aria-selected="false">Saint Barthélemy</option>
            <option role="option" value="3370751" aria-selected="false">Saint Helena</option>
            <option role="option" value="3575174" aria-selected="false">Saint Kitts and Nevis</option>
            <option role="option" value="3576468" aria-selected="false">Saint Lucia</option>
            <option role="option" value="3578421" aria-selected="false">Saint Martin</option>
            <option role="option" value="3424932" aria-selected="false">Saint Pierre and Miquelon</option>
            <option role="option" value="3577815" aria-selected="false">Saint Vincent and the Grenadines</option>
            <option role="option" value="4034894" aria-selected="false">Samoa</option>
            <option role="option" value="3168068" aria-selected="false">San Marino</option>
            <option role="option" value="2410758" aria-selected="false">São Tomé and Príncipe</option>
            <option role="option" value="102358" aria-selected="false">Saudi Arabia</option>
            <option role="option" value="2245662" aria-selected="false">Senegal</option>
            <option role="option" value="6290252" aria-selected="false">Serbia</option>
            <option role="option" value="241170" aria-selected="false">Seychelles</option>
            <option role="option" value="2403846" aria-selected="false">Sierra Leone</option>
            <option role="option" value="1880251" aria-selected="false">Singapore</option>
            <option role="option" value="7609695" aria-selected="false">Sint Maarten</option>
            <option role="option" value="3057568" aria-selected="false">Slovakia</option>
            <option role="option" value="3190538" aria-selected="false">Slovenia</option>
            <option role="option" value="2103350" aria-selected="false">Solomon Islands</option>
            <option role="option" value="51537" aria-selected="false">Somalia</option>
            <option role="option" value="953987" aria-selected="false">South Africa</option>
            <option role="option" value="3474415" aria-selected="false">South Georgia and the South Sandwich Islands</option>
            <option role="option" value="1835841" aria-selected="false">South Korea</option>
            <option role="option" value="2510769" aria-selected="false">Spain</option>
            <option role="option" value="1227603" aria-selected="false">Sri Lanka</option>
            <option role="option" value="3382998" aria-selected="false">Suriname</option>
            <option role="option" value="607072" aria-selected="false">Svalbard and Jan Mayen</option>
            <option role="option" value="934841" aria-selected="false">Swaziland</option>
            <option role="option" value="2661886" aria-selected="false">Sweden</option>
            <option role="option" value="2658434" aria-selected="false">Switzerland</option>
            <option role="option" value="1668284" aria-selected="false">Taiwan</option>
            <option role="option" value="1220409" aria-selected="false">Tajikistan</option>
            <option role="option" value="149590" aria-selected="false">Tanzania</option>
            <option role="option" value="1605651" aria-selected="false">Thailand</option>
            <option role="option" value="2363686" aria-selected="false">Togo</option>
            <option role="option" value="4031074" aria-selected="false">Tokelau</option>
            <option role="option" value="4032283" aria-selected="false">Tonga</option>
            <option role="option" value="3573591" aria-selected="false">Trinidad and Tobago</option>
            <option role="option" value="2464461" aria-selected="false">Tunisia</option>
            <option role="option" value="298795" aria-selected="false">Turkey</option>
            <option role="option" value="1218197" aria-selected="false">Turkmenistan</option>
            <option role="option" value="3576916" aria-selected="false">Turks and Caicos Islands</option>
            <option role="option" value="2110297" aria-selected="false">Tuvalu</option>
            <option role="option" value="5854968" aria-selected="false">U.S. Minor Outlying Islands</option>
            <option role="option" value="4796775" aria-selected="false">U.S. Virgin Islands</option>
            <option role="option" value="226074" aria-selected="false">Uganda</option>
            <option role="option" value="690791" aria-selected="false">Ukraine</option>
            <option role="option" value="290557" aria-selected="false">United Arab Emirates</option>
            <option role="option" value="2635167" aria-selected="false">United Kingdom</option>
            <option role="option" value="6252001" aria-selected="false">United States</option>
            <option role="option" value="3439705" aria-selected="false">Uruguay</option>
            <option role="option" value="1512440" aria-selected="false">Uzbekistan</option>
            <option role="option" value="2134431" aria-selected="false">Vanuatu</option>
            <option role="option" value="3164670" aria-selected="false">Vatican City</option>
            <option role="option" value="3625428" aria-selected="false">Venezuela</option>
            <option role="option" value="1562822" aria-selected="false">Vietnam</option>
            <option role="option" value="4034749" aria-selected="false">Wallis and Futuna</option>
            <option role="option" value="2461445" aria-selected="false">Western Sahara</option>
            <option role="option" value="69543" aria-selected="false">Yemen</option>
            <option role="option" value="895949" aria-selected="false">Zambia</option>
            <option role="option" value="878675" aria-selected="false">Zimbabwe</option>
    </Form.Select>
}*/
//https://stripe.com/global
const stripeCountry = [
    { country: 'Australia', code: 'AU' },
    { country: 'Austria', code: 'AT' },
    { country: 'Belgium', code: 'BE' },
    { country: 'Brazil', code: 'BR' },
    { country: 'Bulgaria', code: 'BG' },
    { country: 'Canada', code: 'CA' },
    { country: 'Croatia', code: 'HR' },
    { country: 'Cyprus', code: 'CY' },
    { country: 'Czech Republic', code: 'CZ' },
    { country: 'Denmark', code: 'DK' },
    { country: 'Dominican Republic', code: 'DO' },
    { country: 'Estonia', code: 'EE' },
    { country: 'Finland', code: 'FI' },
    { country: 'France', code: 'FR' },
    { country: 'Germany', code: 'DE' },
    { country: 'Gibraltar', code: 'GI' },
    { country: 'Greece', code: 'GR' },
    { country: 'Hong Kong SAR China', code: 'HK' },
    { country: 'Hungary', code: 'HU' },
    { country: 'Iceland', code: 'IS' },
    { country: 'India', code: 'IN' },
    { country: 'Indonesia', code: 'ID' },
    { country: 'Ireland', code: 'IE' },
    { country: 'Italy', code: 'IT' },
    { country: 'Japan', code: 'JP' },
    { country: 'Latvia', code: 'LV' },
    { country: 'Liechtenstein', code: 'LI' },
    { country: 'Lithuania', code: 'LT' },
    { country: 'Luxembourg', code: 'LU' },
    { country: 'Malta', code: 'MT' },
    { country: 'Mexico ', code: 'MX' },
    { country: 'Netherlands', code: 'NL' },
    { country: 'New Zealand', code: 'NZ' },
    { country: 'Norway', code: 'NO' },
    { country: 'Poland', code: 'PL' },
    { country: 'Portugal', code: 'PT' },
    { country: 'Romania', code: 'RO' },
    { country: 'Singapore', code: 'SG' },
    { country: 'Slovakia', code: 'SK' },
    { country: 'Slovenia', code: 'SI' },
    { country: 'Spain', code: 'ES' },
    { country: 'Sweden', code: 'SE' },
    { country: 'Switzerland', code: 'CH' },
    { country: 'Thailand', code: 'TH' },
    { country: 'Trinidad & Tobago', code: 'TT' },
    { country: 'United Arab Emirates', code: 'AE' },
    { country: 'United Kingdom', code: 'GB' },
    { country: 'United States', code: 'US' },
  ]

  export function CountrySelector({setRef}) {
    return <Form.Select className="payment_select" ref={setRef}>
            <option role="option" value="" aria-selected="false" disabled="">Choose Country...</option>
            {stripeCountry.map(item=>
                <option role="option" key={item.code} value={item.code} aria-selected="false">{item.country}</option>
            )}         
        </Form.Select>
  }
  