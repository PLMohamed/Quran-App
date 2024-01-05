"use strict";

document.addEventListener('DOMContentLoaded',async () => {
    const surahID = window.location.href.split('/').pop();
    const surahTitle = document.getElementById('surahTitle');
    const surahContainer = document.querySelector('.container');
    const bsm = document.getElementById('bsm'); 

    try {
        const response = await fetch(`http://api.alquran.cloud/v1/surah/${surahID}`,{
        "method":"GET"
        });

        const result = await response.json();
        if(result.status !== "OK")
            throw new Error(`Error ${result.code}`);
        
        display(result);
        localStorage.setItem(surahID,JSON.stringify(result));

        
    } catch (err) {
        console.error(err);
        const result = JSON.parse(localStorage.getItem(surahID));
        display(result);
        
    }

    function display(result) {
        const data = result.data;
        const ayahs = data.ayahs;

        
        surahTitle.innerHTML = data.name;
        document.querySelector('title').innerHTML = data.name;

        ayahs.forEach((ayah,index) => {
            if(index === 0 && surahID != 9){
                bsm.innerHTML = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ";
                displayAyah(ayah.text.split("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ")[1]);
            }
            else
                displayAyah(ayah.text);
            
        });
    }

    function displayAyah(ayah) {
        if(!ayah) return;
        const ayahContainer = document.createElement('p');
        ayahContainer.innerHTML = ayah;
        surahContainer.appendChild(ayahContainer);
    }

    // Function to set multiple cookies from a string
    function setMultipleCookies(dataString, prefix, maxCookieSize = 4090) {
        const dataSize = dataString.length;
        const numCookies = Math.ceil(dataSize / maxCookieSize);

        for (let i = 0; i < numCookies; i++) {
            const start = i * maxCookieSize;
            const end = (i + 1) * maxCookieSize;
            const cookieData = dataString.substring(start, end);

            // Set each cookie with a unique name (using a prefix) and the corresponding data
            document.cookie = `${prefix}${i}=${encodeURIComponent(cookieData)}`;
        }
    }
})