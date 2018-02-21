No es la primera vez que escribo sobre esto y no será la última. Esta vez sé sobre el tema mucho más que las anteriores, y probablemente después sabre más que ahora, y de eso precisamente es de lo que se trata, de aprender.

Es posible que esta vez levante ampollas, pero ¡ey! los comentarios están abiertos y me encanta discutir, siempre que sea civilizadamente.

<!--more-->


Recientemente he estado manteniendo varias conversaciones online acerca de los diferentes paradigmas de programación aplicables en Javascript. En todas ellas se ha plasmado la enorme confusión y desconocimiento sobre el tema que tienen muchos programadores. 

Yo tampoco quiero engañar a nadie, no soy un experto en el tema ni poseo formación académica al respecto. Pero llevo bastante tiempo estudiando diferentes técnicas para hacer mis aplicaciones más fáciles de mantener y extender, y me considero moderadamente informado. 

En ese proceso de aprendizaje, salirse del encorsetado esquema de la herencia de clases ayuda mucho. Especialmente en Javascript, ya que hay alternativas mucho mejores. 

En esas conversaciones a varias bandas sobre la conveniencia o no de usar "clases" para encapsular y reutilizar código, suelen establecerse tres bandos claramente diferenciados:

* Los que defienden el uso de "clases" a capa y espada porque estamos programando orientado a objetos (¡!¿?). 
* Los que defienden el uso de "clases" porque los motores de los navegadores optimizan el rendimiento de los objetos creados de esta forma. 
* Los que defendemos que limitarse al uso de "clases" produce código difícil de leer, difícil de entender y propenso a romperse cuando se introducen cambios. 

Los primeros le están poniendo puertas al campo sin saberlo. Y ese suele ser el problema: un amplio desconocimiento de lo que significa orientar a objetos y de los entresijos de la creación de objetos en Javascript. Aclaro que no es mi intención ofender a nadie, pero las verdades a veces ofenden, que le vamos a hacer. 

Los segundos siempre se estrellan tarde o temprano en estas conversaciones, sin darse cuanta de que la discusión no va sobre eso. Ignorando consciente o inconscientemente uno de los principios básicos que guiaron a los creadores de la programación orientada a objetos, defienden el uso de clases a muerte. La idea clave de la POO no fue hacer programas más rápidos o que ahorren más memoria. Su objetivo era conseguir código más reutilizable y más fácil de mantener y entender. Si el paradigma que crearon lo consigue en mayor o menor medida es otro cantar, pero lo que está defendiendo este grupo no es el paradigma, sino una mala costumbre que se denomina **optimización prematura**. Muchos de ellos hacen de [jsperf](https://jsperf.com/) su biblia particular y la blanden a diestro y siniestro como si de la Espada de Damocles se tratara. 

Permitanme bromear un poco. Si lo que queremos es optimizar al máximo, escribamos todo nuestro código de forma estructurada (sin funciones o procedimientos), como se hacía en los años 50 del siglo pasado. Os puedo asegurar que no vais a conseguir código más rápido (a no ser que queráis escribir en ensamblador o en código máquina). Olvidaos de crear objetos, de llamar a funciones, de encapsular en definitiva, porque encapsular es lo que consume memoria y desperdicia recursos. 

Es broma, pero está mucho más cerca de la verdad de lo que parece. Cualquier intento de optimizar un programa ha de ir necesariamente en esta dirección. La creación de objetos consume memoria y tiempo. Las funciones consumen memoria, y tiempo cuando se las llama. 

Una vez más, el énfasis de todos los paradigmas de programación surgidos desde aquella época está puesto en la reusabilidad, la flexibilidad y el mantenimiento. La optimización del código debería ser la última fase de cada proyecto, y realizarse con la ayuda de un perfilador (*profiler*) que permita encontrar cuales son los cuellos de botella de la aplicación. De esta forma sólo sacrificas flexibilidad por rendimiento en la parte del código que es necesario. 

Optimizar cada trozo de código en un mundo de dispositivos con memorias que se miden en gigabytes y procesadores con velocidades de reloj que se miden en gigahercios es, simplemente, absurdo.

Desgraciadamente los de la tercera opción somos minoría. Probablemente porque llegar a esta conclusión requiere experiencia en proyectos grandes y complejos, pero no solo. También requiere estudio para conocer las alternativas. 

Lo anterior se puede aplicar a cualquier lenguaje. Pero además, en Javascript, requiere un conocimiento detallado de como se crean los objetos en Javascript, como se enlazan a su prototipo, y como se delegan responsabilidades en él. 

Antes de trabajar con Javascript nunca me tuve que preocupar por eso. Creaba mis clases, las instanciaba y listo. No había alternativa para encapsular y reutilizar. Todo el código tenía que ir dentro de ellas. 

En todos los lenguajes *clasicos* el comportamiento de los objetos creados de esta manera es predecible, porque es prácticamente igual en todos ellos. 

Esa familiaridad con el mundo de las clases nos ha jugado a todos malas pasadas en el mundo de los prototipos de Javascript, porque el mecanismo por el que se reaprovecha código no es la herencia, es la delegación. 

Son muchos los que han intentado retorcer el lenguaje para que se comporte como si hubiera herencia. El mismo comité que produce la especificación del lenguaje ha introducido "azucar sintáctico" (*syntax sugar*), más o menos a demanda de los usuarios, con la excusa de hacer más llevadera la transición a los recién llegados. 

En mi opinión todo este esfuerzo es un desperdicio. Si tratas las "clases" de Javascript como las clases canónicas de otros lenguajes, más tarde o temprano hacen agua. Y que empiecen a hacerlo cuando llevas escritas decenas de miles de líneas de código es una putada, hablando en plata.

Si os fijáis, en cada ocasión que he utilizado la palabra "clases" referida a Javascript la he entrecomillado intencionadamente. Esto es, por si no lo sabíais o aún no lo habéis adivinado después de leer estas lineas, porque no hay clases en Javascript. 

Pese a todas las apariencias, aunque en la nueva versión del lenguaje (ES2015) haya una palabra clave `class`, **no hay clases en javascript**, y nunca las habrá. Es más **no hay herencia**, propiamente dicha, **en javascript**. 

Hay **prototipos** y **delegación de comportamiento** a través de **enlaces al prototipo**, un mecanismo que es radicalmente diferente y que funciona en sentido contrario a la herencia. Algo que Kyle Simpson (autor de la serie de libros *You don't know Javascript*) describe muy acertadamente como **[OLOO](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch6.md)**, *Objects Linked to Other Objects*. 

En mi opinión este mecanismo es muy superior a la herencia, pese a que no estemos acostumbrados a él y lleve algo de tiempo cambiar el chip. 

Para los programadores que disfrutamos de la flexibilidad de Javascript, dominarlo puede ser un primer paso hacia la programación funcional, otro paradigma de programación muy interesante, más abstracto y matemático, pero muy útil para las cosas que nos importan (reutilización, mantenimiento, flexibilidad al cambio). 

En mis próximas entradas voy a intentar arrojar algo de luz sobre este tema, usando ejemplos realistas de aplicación y comparando código "clasíco" con código que usa los objetos y sus prototipos como lo que son. Preparar los ejemplos va a llevar tiempo, pero creo que mis argumentos merecen y necesitan ser justificados.

Antes de despedirme hasta la próxima entrada, si te sientes ofendida u ofendido por alguna de mis vehementes afirmaciones, te pido disculpas. Pero también te pido que dejes a un lado tu orgullo de programador y explores conmigo los ejemplos de las próximas entradas, posiblemente aprendamos algo nuevo. Juntos, porque aunque exprese mis opiniones de forma cruda, estoy abierto al diálogo y no creo poseer la verdad absoluta sobre nada. Para eso están los comentarios, no faltaría más.
 

 