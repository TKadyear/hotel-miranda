# Data Structure
## Location hotel

```js
{
  region: {
    type: String,
    required:true
  },
  lat: {
    type:Number,
    required:true
  },
  lng: {
    type:Number,
    required:true
  }
}
```
The ``lat`` and ``lng`` are the coordenates required by google Maps for make each marker on the map.

The ``region`` is required in order to make the select options dynamic, which can change only adding another location of the hotel to the array.

## Possibles Regions
| Possibles Regions             |
| ----------------------------- |
| 'Andalucía'                   |
| 'Aragón'                      |
| 'Asturias, Principado de'     |
| 'Balears, Illes'              |
| 'Canarias'                    |
| 'Cantabria'                   |
| 'Castilla y León'             |
| 'Castilla - La Mancha'        |
| 'Cataluña / Catalunya'        |
| 'Comunitat Valenciana'        |
| 'Extremadura'                 |
| 'Galicia'                     |
| 'Madrid, Comunidad de'        |
| 'Murcia, Región de'           |
| 'Navarra, Comunidad Foral de' |
| 'País Vasco / Euskadi'        |
| 'Rioja, La'                   |
| 'Ceuta'                       |
| 'Melilla'                     |
