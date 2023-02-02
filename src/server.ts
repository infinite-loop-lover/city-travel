import { createServer } from 'miragejs';
import { DDPoint, Haversine } from 'haversine-ts'


export function makeServer() {
    const data = [
        { id: 1, city: 'Paris', latitude: 48.856614, longitude: 2.352222 },
        { id: 2, city: 'Marseille', latitude: 43.296482, longitude: 5.369780 },
        { id: 3, city: 'Lyon', latitude: 45.764043, longitude: 4.835659 },
        { id: 4, city: 'Toulouse', latitude: 43.604652, longitude: 1.444209 },
        { id: 5, city: 'Nice', latitude: 43.710173, longitude: 7.261953 },
        { id: 6, city: 'Nantes', latitude: 47.218371, longitude: -1.553621 },
        { id: 7, city: 'Strasbourg', latitude: 48.573405, longitude: 7.752111 },
        { id: 8, city: 'Montpellier', latitude: 43.610769, longitude: 3.876716 },
        { id: 9, city: 'Bordeaux', latitude: 44.837789, longitude: -0.579180 },
        { id: 10, city: 'Lille', latitude: 50.629250, longitude: 3.057256 },
        { id: 11, city: 'Rennes', latitude: 48.117266, longitude: -1.677793 },
        { id: 12, city: 'Reims', latitude: 49.258329, longitude: 4.031696 },
        { id: 13, city: 'Le Havre', latitude: 49.494370, longitude: 0.107929 },
        { id: 14, city: 'Saint-Étienne', latitude: 45.439695, longitude: 4.387178 },
        { id: 15, city: 'Toulon', latitude: 43.124228, longitude: 5.928000 },
        { id: 16, city: 'Angers', latitude: 47.478419, longitude: -0.563166 },
        { id: 17, city: 'Grenoble', latitude: 45.188529, longitude: 5.724524 },
        { id: 18, city: 'Dijon', latitude: 47.322047, longitude: 5.041480 },
        { id: 19, city: 'Nîmes', latitude: 43.836699, longitude: 4.360054 },
        { id: 20, city: 'Aix-en-Provence', latitude: 43.529742, longitude: 5.447427 },
    ]

    createServer({

        routes() {
            this.get('http://localhost:4000/cities', (schema, request) => {
                if (request.queryParams.query.toLocaleLowerCase() === 'fail') {
                    return ['failed']
                } else {
                    let res = data.filter((ele: any) => ele.city.includes(request.queryParams.query))
                    return res;
                }
            },
                { timing: 800 });
            this.post('http://localhost:4000/', (schema, request) => {
                let req = JSON.parse(request.requestBody)
                let hasError: boolean = false;
                if (req.origin.value === 'Dijon' || req.dest.value === 'Dijon') {
                    hasError = true;
                } else {
                    hasError = false;
                }
                req.inter.forEach((element: any) => {
                    if (element.value === 'Dijon') {
                        hasError = true;
                    }
                });

                if (hasError === false) {
                    let length = req.inter.length + 2;

                    let cityArray = [];
                    let disArray = [];
                    for (let i = 0; i < length; i++) {
                        if (i === 0) {
                            cityArray.push(data.filter((ele: any) => ele.id === req.origin.id))
                        } else if (i === length - 1) {
                            cityArray.push(data.filter((ele: any) => ele.id === req.dest.id))
                        } else {
                            cityArray.push(data.filter((ele: any) => ele.id === req.inter[i - 1].id))
                        }
                    }
                    for (let i = 0; i < length - 1; i++) {
                        let a = new DDPoint(
                            cityArray[i][0].latitude,
                            cityArray[i][0].longitude
                        )
                        let b = new DDPoint(
                            cityArray[i + 1][0].latitude,
                            cityArray[i + 1][0].longitude
                        )
                        const haversine = new Haversine();
                        const distance = haversine.getDistance(a, b)
                        const i_data = [cityArray[i][0].city, cityArray[i + 1][0].city, distance]
                        disArray.push(i_data);
                    }
                    return disArray
                } else {
                    return ['fail']
                }
            }, { timing: 1000 });

        },
    });

}