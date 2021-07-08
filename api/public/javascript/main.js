const URL = `http://localhost:3000`;
const showDataMarket = async () => {
            fetch(`${URL}/api/binance?alias=ETHUSDT`)
            .then(result => {
                const data = result.json();
                let strong = document.getElementById('alias');
                strong.innerHTML = `${data}`;
                console.log(data);
            })
            .catch(err => {
                alert(err);
            });

            let socket = io.connect(URL, {
                forceNew: true,
            });

            socket.on('price', (data) => {
                let strong = document.getElementById('price');
                strong.innerHTML = `${data}`;
            });
}

showDataMarket();