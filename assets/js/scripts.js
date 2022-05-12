$(document).ready(function() {
    $("form").submit(function(event) {
        event.preventDefault();
        /* Ingreso de ID */
        var heroID = $("#shInput").val();
        /* Validación numérica de ID ingresado */
        var validatePattern = /[0-9]/gim;
        let validateID = validatePattern.test(heroID);
        console.log(heroID);
        if(!validateID) {
            alert("Valor ingresado incorrecto. Por favor ingresa solo números.");
        }

        /* API */
        $.ajax({
            type: "GET",
            url: `https://www.superheroapi.com/api.php/4905856019427443/${heroID}`,
            dataType: 'json',
            success: function(data) {
                console.log(data.connections);

                /* Imagen desde API a DOM */
                $("#heroPic").html(`
                <hr>
                <h3>${data.name}</h3>
                <hr>
                <img src="${data.image.url}" alt="${data.name}" title="${data.name}"></img>
                `);

                /* Bio desde API a DOM */
                $("#heroBio").html(`
                <hr><p><b>Conexiones: </b>${data.connections["group-affiliation"]}.
                <hr><p><b>Parentezco: </b>${data.connections.relatives}.</p>
                <hr><p><b>Publicado por: </b>${data.biography.publisher}</p>
                <hr><p><b>Primera aparición: </b>${data.biography["first-appearance"]}</p>
                <hr><p><b>Altura: </b>${data.appearance.height[0]} • ${data.appearance.height[1]}</p>
                <hr><p><b>Peso: </b>${data.appearance.weight[0]} • ${data.appearance.weight[1]}</p>
                <hr><p><b>Alias: </b>${data.biography.aliases}</p>
                `);
                
                /* ChartJS */
                const labels = [
                    'Inteligencia',
                    'Fuerza',
                    'Velocidad',
                    'Durabilidad',
                    'Poder',
                    'Combate',
                ];
                const stats = {
                    labels: labels,
                    datasets: [{
                        label: "Estadísticas",
                        fill: true,
                        backgroundColor: 'rgb(255, 255, 0, 0.5)',
                        borderColor: 'rgb(255, 255, 0)',
                        pointBackgroundColor: 'rgb(255, 255, 0)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(255, 255, 0)',
                        data: [
                            data.powerstats.intelligence,
                            data.powerstats.strength,
                            data.powerstats.speed,
                            data.powerstats.durability,
                            data.powerstats.power,
                            data.powerstats.combat,
                        ],
                    }]
                };
                const config = {
                    type: 'radar',
                    data: stats,
                    options: {}
                };
                const myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                );
                myChart.render()
            }, // Fin success
        }); // Fin AJAX
    }); // Fin button
}); // Fin document.ready