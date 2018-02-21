## Objetos
Estos valientes tienen la osadía de pretender encapsular estado y comportamiento en una unidad indivisible.

Para entendernos: llamamos **estado** a cualquier información que queramos almacenar en variables; llamamos **comportamiento** a lo que hacen nuestros objetos, sus funciones o métodos.

Crear objetos en javascript puede ser terriblemente fácil:
```js
var rob = {
    name: 'Rob',
    house: 'Stark',
    sigil: 'wolf',
    saying: 'winter is comming',
    challenge: function(who){
        console.log('Hey! Week and insignificant ' + who.sigil + '! Bend your knee to a ' + this.sigil + '. Because ' + saying + '.');
    }
}
```
Ninguna sorpresa todavía. Todos conocemos este tipo de ejemplos *naive* de cuando empezabamos con javascript.

Pero quiero recordarlo, porque se suele olvidar esta forma de crear objetos es en muchas ocasiones es la más apropiada. 

Sí que solemos acordarnos de este formato para pasar información de una función a otra. Pero no para encapsular comportamiento.

Si sólo necesitamos una instancia de un tipo de objeto, no tiene sentido rodear creación en algo esotérico rodeado de palabras mágicas, runas exóticas, y aspavientos ridículos.

Ejemplo más útil: Necesitamos encapsular una serie de métodos para manipular el DOM de una página:
// TODO: Test this code
```js
var domUtils = {
    init: function() {
        var css = ".hidden { display: none !important; }";
        this.createElement({
            tag: style,
            contents: document.createTextNode(css)
        });
    },
    createElement: function(config) {
        var el = document.createElement(config.tag);
        if (config.id) el.id = config.id;
        if (config.attributes) {
            for (var attr in config.attributes){
                el.setAttribute(attr, config.attributes[attr]);
            }
        }
        if (config.classes){
            var classes = [].concat(config.classes); 
            classes.forEach(function(cssClass) {
                if (cssClass !== "") el.classList.add(cssClass);
            });
        } 
        if (config.contents) {
            var contents = [].concat(config.contents);
            contents.forEach(function(item) {
                if(this.isHTMLNode(item)){ 
                    el.appendChild(item);
                } else {
                    el.appendChild(createElement(item));
                }
            });
        }
        return el;
    },
    appendElement: function (parent, child) {
        // If the child is not an HTML node we assume it is a configuration object to create one.
        if (!child.nodeName) {
            child = this.createElement(child);
        }
        parent.appendChild(child);
    },
    hide: function (el) {
        if (!el.classList.contains('hidden')) {
            el.classList.add('hidden');
        }
    },
    unHide: function (el) {
        if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
        }
    },
    isHTMLNode: function  (obj) {
        return !!obj.nodeName;
    }
}
```

¿Necesitamos rodear la creación de este objeto de esoterismo de una clase? No. ¿Sería mejor crearlo con alguna otra funcíón? Tampoco. ¿Para qué? ¿Necesitamos más de una instancia? No. Pues ya está, lo tenemos creado y, así, tal cual, ya es un singleton (Todo lo singleton que puede ser un singleton en javascript).

A veces lo sencillo es lo mejor.

## Creación de varios objetos del mismo tipo: *Factory functions*
La implementación del objeto `rob` sugiere que hay más objetos del mismo tipo con los que puede interaccionar.

En este caso, crearlos todos "a mano" parece un poco tedioso y lo es. Tenemos que encontrar una forma de automatizar el proceso.

Mmmmm, alguna o alguno ya estáis pensando ¡va a usar una "clase", va a usar una "clase"!. Lo siento, pero no.

Bienvenidos al maravilloso mundo de las "funciones fábrica", conocidas en inglés como *factory functions*

```js
function lordFactory (state) {
    return {
        name: state.name,
        house: state.house || 'homeless',
        sigil: state.house || 'no one',
        saying: state.saying || "I ... don't know what to say",
        challenge: function(who){
            console.log('Hey! Week and insignificant ' + who.house + ' ' +  who.sigil + '! Bend your knee to a ' + this.sigil + '. Because ' + saying + '.');
        }
    }
}
```

Pruebalo tú misma:
```js
rob = lordFactory({ name: 'Rob', house: 'Stark', sigil: 'wolf',
    saying: 'winter is comming'});


``` 

Más despacio Glantucan! Más despacio. Pero esa *factory function* va a añadir una copia de la función `challenge` a cada objeto que genere. 

Cierto! Pero como ya he dicho muchas veces: 
>¿A quien le importan unos pocos bytes en el mundo de gigabytes en el que vivimos?.

Sí aun así, crees que no puedes vivir sin ahorrar esos bytes extra, echa un ojo un poco más abajo, donde hablo de `Object.create` que se puede utilizar para conseguirlo, aunque no es esta su principal ventaja.

Compara esta versión con el uso de "clases" tradicional y en su nueva versión del ES2016 (pasa el ratón por encima de las etiquetas para pasar de una a otra):

// TODO: Include factory function, ES5 class, and ES2016 class comparison here.



¿De verdad crees que merece la pena usar clases porque el concepto es ligeramente más familiar? Todavía, la versión ES2016 es relativamente sencilla. Pero el uso de *factory functions* tiene otras ventajas, y tratar de usar "clases" y "herencia" en javascript no tiene ninguna, los objetos creados son exáctamente iguales al ojo de código que los usutiliza. Hablaremos más de esto, de momento continúo.

## Usar un objeto como punto de partida para crear otro: `Object.create`

Mmmm, esto huele a herencia, y ¡sorpresa! no lo es. En javascript podemos usar un objeto como prototipo de otro objeto. Pero qué significa eso exáctamente.

Significa que se establece un enlace del contexto de un objeto con el de su prototipo. Si llamamos a una función o intentamos acceder a una propiedad que no existe en el primer objeto, se busca en su prototipo automáticamente.

¿Se parece esto a la herencia de clases? Mmmmm... remotamente... Muy remotamente, tanto que yo diría que no.

Veamos, en un lenguaje *clásico* una clase sirve como molde para crear objetos, no existe como tal en el *runtime*. Lo único visible de la clase para el programa durante su ejecución es su constructor, que por cierto es una función (Olvídate de momento de las clases estáticas).  

Cuando creamos una instancia de la clase, el constructor **copia** todos los miembros definidos en la clase al objeto. Cada instancia **hereda** una copia de los miembros de la clase.


La diferencia más evidente con javascript es que cuando creamos un objeto a partir de un prototipo los miembros del segundo no se copian al primero. Se establece un enlace interno como el que he descrito antes.

Si creamos muchos objetos similares a partir del mismo prototipo todos comparten ese enlace interno a los miembros del prototipo, no poseen copias independientes de los mismos.

Cuando llamamos a un método que está definido en el prototipo de un objeto, el objeto **delega** en su prototipo la ejecución de ese método. A esto se le llama **Delegación de comportamiento**. 

¿Veis la diferencia?
Clase ---> copia funcionalidad ---> objetos
Prototipo <--- delegan funcionalidad <--- Objetos
// TODO: make a nice diagram showing the relationship

La dirección de la relación en un caso es la opuesta del otro.


// TODO: Ejemplo Object.create()


// TODO: Problemas de abusar de los prototipos para "heredar" propiedades
