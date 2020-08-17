

    document.getElementById("formInput").addEventListener('submit',searchBtn);
    function searchBtn(event) {
        resetInputBar();
        var searchInput = document.getElementById("searchInput").value;
        console.log(searchInput)

            fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    showSearchInfo(data);
                } else {
                    document.getElementById("searchingOutput").innerText = "No item found !"
                }
            })
            .catch(err => {
                console.log(err);
                document.getElementById("searchingOutput").innerText = "No item found !"
            })
            event.preventDefault();
    }
    
    function showSearchInfo(allData) {
        let data = allData.data;
        console.log(data);
        let list = [];
        for (let i = 0; i < 10; i++) {
            const item = {
                title: data[i].title,
                albumTitle: data[i].album.title,
                artistImage: data[i].artist.picture_small,
                albumImage: data[i].album.cover_small,
                artistName: data[i].artist.name

            }

            list.push(item);
        }
        console.log(list);

        let display = document.getElementById("display-result");
        display.innerHTML = "";
        document.querySelector('.single-result').style.display = "block";
        for (let i = 0; i < list.length; i++) {
            const { title, albumTitle, albumImage, artistName, artistImage } = list[i];
            display.innerHTML = display.innerHTML +
                `<div class="col-md-6 col-sm-6 result">
                    <h3 class="lyrics-name"><span id="title">${title}</span></h3>
                    <p class="author lead">Artist : <span id="artistName">${artistName}</span></p>
                    <p class="author lead">Album : <span id="albumTitle">${albumTitle}</span></p>
                </div>
                <div class="col-md-3 col-sm-3 ">
                    <img src="${artistImage}" class="img-fluid">
                    <img src="${albumImage}" class="img-fluid">
                </div>
                <div class ="col-md-3 col-sm-3 text-md-right text-center">
                    <a href="#" onclick="getLyrics('${title}','${artistName}','${albumImage}','${artistImage}')" class="btn btn-success">Get Lyrics</a>
                </div>
                <div class="bottom-line"></div>`
        }
    }

    const resetInputBar = () => {
        document.getElementById("titleName").innerText = "";
        document.getElementById("artistName").innerText = "";
        document.getElementById("lyrics").innerText = "";
        document.getElementById("song-image").innerHTML = "";
        document.getElementById("searchingOutput").innerText = "";
        document.getElementById("display-result").innerText = "";

    }

    const getLyrics = (title, artistName) => {
        console.log(title, artistName);
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
            .then(response => response.json())
            .then(data => displayLyrics(data, title, artistName))
            .catch(err => console.log(err))
    }

    const displayLyrics = (data, title) => {

        document.getElementById("titleName").innerText = title;
        if (data.lyrics) {
            document.getElementById("lyrics").innerText = data.lyrics;
        } else {
            document.getElementById("lyrics").innerText = "Sorry,Lyrics is not found!"
        }
    }
