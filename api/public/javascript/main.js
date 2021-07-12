const URL = `http://localhost:3000`;
const showDataMarket = async () => {
            await fetch(`${URL}/api/binance?alias=ETHUSDT`, {
                method: 'get',
                mode: 'cors',
            })
            .then(async result => {
                const data = await result.json();
                let strong = document.getElementById('alias');
                strong.innerHTML = `${data.body}`;
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