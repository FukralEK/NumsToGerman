console.log("script.js loaded");

const onesText = ["eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"];
const teensText = ["elf", "zwölf", "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"];
const tensText = ["zwanzig", "dreizig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"];

function einsToEin(beforeText, female = false)
{
    let text = beforeText.split("");
    for (let i = text.length; i > 0; i--)
    {
        if (text[i-3] == "e" && text[i-2] == "i" && text[i-1] == "n" && text[i] == "s")
        {
            if (female)
            {
                text[i] = "e";
            }
            else text.splice(i, 1);
        }
    }
    return text.join("");
}


function getThreeDegits(number = 0)
{
    let numStr = number.toString();

    if (numStr.length > 3)
    {
        return;
    }

    const charactersToAdd = 3-numStr.length;
    for (let i = 0; i < charactersToAdd; i++)
    {
        numStr = '0' + numStr;
    }

    let ones = parseInt(numStr[numStr.length - 1]);  
    let tens = parseInt(numStr[numStr.length - 2]); 
    let hundreds = parseInt(numStr[numStr.length - 3]);

    let result = "";

    if (tens == 0 && ones != 0)
    {
        result = onesText[ones-1];
    }
    else if (tens == 1)
    {
        result = teensText[ones-1];
    }
    if (tens == 1 && ones == 0)
    {
        result = "zehn";
    }

    if (tens > 1 && ones != 0)
    {
        result = einsToEin(onesText[ones-1], false) + "und" + tensText[tens-2];
    }
    if (tens > 1 && ones == 0)
    {
        result = tensText[tens-2];
    }

    if (hundreds == 0)
    {
        return result;
    }
    result = einsToEin(onesText[hundreds-1], false) + "hundert" + result;
    return result;
}

function convertNum() {
    let numInWords = "";
    let numInInt = parseInt(document.getElementById("NumberBox").value);
    const resultId = "Result";

    if (isNaN(numInInt))
    {
        document.getElementById(resultId).innerHTML = "Not a Proper Number";
        return;
    }

    let numStr = numInInt.toString();

    if (numStr.length > 15)
    {
        document.getElementById(resultId).innerHTML = "Not a Proper Number";
        return;
    }

    const charactersToAdd = 15-numStr.length;
    for (let i = 0; i < charactersToAdd; i++)
    {
        numStr = '0' + numStr;
    }

    let ones = parseInt(numStr[numStr.length - 1]) + parseInt(numStr[numStr.length - 2]) * 10 + parseInt(numStr[numStr.length - 3]) * 100;  
    let thousands = parseInt(numStr[numStr.length - 4])+ parseInt(numStr[numStr.length - 5]) * 10+ parseInt(numStr[numStr.length - 6]) * 100;
    let milions = parseInt(numStr[numStr.length - 7]) + parseInt(numStr[numStr.length - 8]) * 10 +parseInt(numStr[numStr.length - 9]) * 100;
    let billions = parseInt(numStr[numStr.length - 10]) + parseInt(numStr[numStr.length - 11]) * 10 +parseInt(numStr[numStr.length - 12]) * 100;
    let trilions = parseInt(numStr[numStr.length - 13]) + parseInt(numStr[numStr.length - 14]) * 10 +parseInt(numStr[numStr.length - 15]) * 100;


    if (ones != 0)
    {
        numInWords = getThreeDegits(ones);
    }
    if (thousands != 0)
    {
        numInWords = einsToEin(getThreeDegits(thousands), false) + "tausend" + numInWords;
    }
    if (milions != 0)
    {
        if (milions == 1)
        {
            numInWords = "eine Million " + numInWords;
        }
        else numInWords = getThreeDegits(milions) + " Millionen " + numInWords;
    }
    if (billions != 0)
    {
        if (billions == 1)
        {
            numInWords = "eine Milliarde " + numInWords;
        }
        else numInWords = getThreeDegits(billions) + " Milliarden " + numInWords;
    }
    if (trilions != 0)
    {
        if (trilions == 1)
        {
            numInWords = "eine Billion " + numInWords;
        }
        else numInWords = getThreeDegits(trilions) + " Billionen " + numInWords;
    }
    
    if (numInWords == "")
    {
        numInWords = "null";
    }
    
    document.getElementById(resultId).innerHTML = numInWords.charAt(0).toUpperCase() + numInWords.slice(1);
}
