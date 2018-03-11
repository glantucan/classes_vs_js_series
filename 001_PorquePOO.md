Antes de meternos en harina acerca de las posibles maneras de hacer programación orientada a objetos en Javascript me gustaría sentar algunas basaes, para no perder el norte. 
¿Alguna ve te has planteado el por qué de la orientación a objetos? ¿Qué problema o problemas resuelve frente al código puramente procedural?

En mi opinión, un programa es un artefacto, llamémoslo así, que transforma un conjunto de datos (el estado inicial) en otro conjuntos de datos (el estado final).

La definición más extendida, o al menos la que la mayoría de la gente tenemos en la cabeza, es que un programa es un conjunto de instrucciones, dadas al computador, que realizan una o un conjunto de tareas.

Pero en mi opinión esta definición es incompleta, porque esa tarea, al menos en la mayoría de los programa útiles hoy en día, tiene un contexto que es inexcusable olvidar. Ese contexto son los datos de partida. Cualquiera que sea la tarea que queramos que realice el programa, ha de tener en cuenta ese estado inicial (sacado de una base de datos, un archivo, la interacción con el usuario, ... o una combinación de todos ellos).

En este sentido el paradigma procedural adolece de un estado global, es decir, los datos son accesibles desde cualquier parte del programa. Esto supone un serio problema en el momento en el que dos o más partes del programa pueden modificar los mismos datos.   

A medida que el programa se hace más complejo, se hace más difícil mantener el estado de forma consistente y predecir cual va a ser el estado final. 

Los programas modernos acaban siendo muy complejos debido a la diversidad de formas en la que los usuarios pueden interaccionar en tiempo real con ellos. Esta es una de las razones por las que la cantidad de puntos en los que el estado global puede ser modificado se multiplican.

Para que nos entendamos. Esta es la razón por la que se dice que las variables globales son el mal encarnado.

En último término, cualquier bug en un programa tiene que ver de una manera u otra con que en algún punto del mismo el estado no es correcto o no es el esperado.

La POO intenta resolver este problema encapsulando el estado, y las funciones que pueden modificarlo, en objetos. Para que la solución de el problema sea real el estado debe ser privado y sólo accesible a través de las funciones que forman parte de lo que se llama interfaz pública de cada objeto.

El programa se subdivide entonces en objetos que clasifican y encapsulan porciones del estado de la aplicación y que son capaces de enviarse mensajes entre ellos a través de dicha interfaz para modificar y transformar ese estado.

Por supuesto, la orientación a objetos sirve de poco si el estado no está bien encapsulado o la interfaz de los objetos mal diseñada.

Si tienes todo lo anterior presente de forma habitual cuando diseñas o implementes un programa, te pido perdón por el royo, pero te sorprendería lo poco habitual que es esta forma de pensar entre los programadores.

Además los lenguajes orientados a objetos pueden ofrecer otros mecanismos cuyo objetivo es ayudar a manejar la complejidad dentro del programa. Estoy hablando de las clases, la herencia, la composición, interfaces explícitas que deben cumplir las clases, varias formas de polimorfismo, etc.

Al menos la mayoría de los lenguajes a los que la mayoría de los programadores están acostumbrados ofrecen estas características.

Pensar que la programación orientada a objetos son esos mecanismos es un error grave, en mi opinión, una pecado que debería ser castigado con el despido inmediato, ya que los efectos de esta carencia de visión en un proyecto profesional son devastadores.

Estos mecanismos son solo un medio para alcanzar un fin, la consistencia del estado de la aplicación. La gestión del a complejidad de la aplicación es importante, pero totalmente infructuoso si no consigue el objetivo principal.

Y aquí es donde entra Javascript. Los lenguajes como C++ o Java utilizan clases como modelos a partir de los que crear objetos (copiando las propiedades y los métodos definidos en ellas a cada objeto que se instancia). En estos lenguajes no puedes crear un objeto si no creas una clase antes que defina sus miembros.

Javascript ofrece un mecanismo de creación de objetos radicalmente opuesto. Los objetos pueden ser creados mediante literales, o basándose en otros objetos y delegando su interfaz en la que tienen dichos objetos base.

Si te han enseñado otra cosa, no voy a decir que quien te lo enseñó tuviera malas intenciones porque no lo creo, te han dado una visión equivocada y errónea del lenguaje haciéndote creer que puedes crear algo parecido a una clase en Javascript.

Pero basta de rollos vamos ver un ejemplo de lo que te pueden haber contado:


...

Primera llamada de atención.

Instanciar un objeto en un lenguaje clásico copia propiedades y métodos a la instancia
Si borro un método de la instancia, eso no cambia la clase. Si borro una propiedad de la clase no se borra de la clase.
No hay un enlace permanente entre clase he instancia. La relación entre la clase y la instancia acaba en el momento en el que se termina de instanciar el objeto.
Lo mismo se aplica a la herencia. Saco la herencia a relucir tan temprano porque en Javascript instanciar y heredar vienen a significar cosas muy parecidas. Una instancia en javascript es un objeto que hereda parte de sus propiedades y/o métodos de otro objeto. Y aquí me estoy tomando la licencia de usar el término herencia porque todos tenemos familiaridad con él. Pero depués voy a renombrar esa relación para no confundir la herencia de clases con lo que ocurre realmente en Javascript.

Esto no es así en Javascript. En javascript hay un enlace permanente entre un objeto y su prototipo. De hecho eso que llamamos la cadena de prototipos (*prototype chain*), que seguimos para resolver una propiedad o método cuando estos no están implementados directamente en el objeto existe porque ese enlace y su prototipo es permenente.

Esto quiere decir que si se modifica una propiedad o método de un objeto que es prototipo de otros, estamos modificando las propiedades o métodos de todos esos objetos.


...


En ES5 no puedes emular polimorfismo porque no existe nada parecido a super().
Puedes hacer PrototypeConstructor.prototype.methodName.call(this) que es horrible no sólo por lo largo que es sino porque hace más fuerte todavía la dependencia entre un objeto y el objeto del que hereda e introduce nuevos problemas a la hora de hacer cambios y mantener el código.
Puedes llamar al método en el padre de otra forma y no hacer shadowing pero eso se carga el polimorfismo completamente, y la interfaz común, por cierto.





## GALAGA CLONE

Construyes el juego pensando en una resolución 600x800, como dice las especs.

### Weirdness

* No hay propiedades ni métodos privados. Tampoco tenemos `protected`. Podemos emular `private` con *getters* y variables no exportadas en el módulo, pero es salirnos de la sintaxis típica de los lenguajes orientados a clases, aparte de que nos salimos del contexto del paradigma al usar clausuras.
* Tampoco tenemos propiedades estáticas que son útiles para crear constantes de configuración (ver Stage en relación al método scale). Lo único que podemos hacer es crear *getters* estáticos.


## Problemas con el constructor
No puedes asignar propiedades antes de llamar a super() en una subclase.

En `Stars`, lo lógico hubiera sido crear los objetos de definición para la posición de las estrellas en el constructor. Pero no podemos antes de llamar a `super()`, pero el constructor de `Sprite` llama a `draw()`, para crear el cache de renderizado en el momento de instanciar cualquier sprite, y `draw()` en esta implementación concreta de `Sprite` necesita que la propiedad `stars` esté inicializada.
No hay más salida que dar un rodeo que considero bastante horroroso:

```js
draw() {
    if (!this._stars) {
        this.stars = [];
        for (var i = 0; i < 500; i++) {
            this.stars[i] = {
                x: Math.random() * this._w,
                y: Math.random() * this._h,
                radius: Math.sqrt(Math.random() * 2),
                alpha: 1.0,
                decreasing: true,
                dRatio: Math.random()*0.05
            };
        }
    }

    // ...

```


### Primer problema

Cuando lo tienes terminado te dicen que tiene que ser responsive y adaptarse al tamaño de la pantalla -> Ups!!!
Todos los tamaños relativos.


### Segundo problema

Ups -> En pantallas grandes el canvas es enorme y redibujar todo en cada frame es tremendamente ineficiente

Método draw() será llamado por Sprite.render() para cada instancia en cada frame.
Nos damos cuenta de que esto es ineficiente. Decidimos dibujar en un canvas offScreen -> tenemos que cambiar la función draw() en cada subclase de Sprite.
