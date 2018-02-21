var domUtils = {
    init: function() {
        var css = ".hidden { display: none !important; }";
        domUtils.createElement({
            tag: style,
            contents: document.createTextNode(css)
        });
    },
    createText: function(text){
        console.log('Creating text node: ', text );
        return document.createTextNode(text);
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
                if(domUtils.isHTMLNode(item)){ 
                    console.log('appending', item);
                    el.appendChild(item);
                } else if (typeof item === 'string') {
                    console.log('Creating and appending text', item);
                    el.appendChild(document.createTextNode(item));
                } else {
                    console.log('creating', item);
                    el.appendChild(domUtils.createElement(item));
                }
            });
        }
        if (config.buttonAction){
            if (!el.classList.contains('button')) el.classList.add('button');
            el.addEventListener('click', config.buttonAction);
        }
        return el;
    },
    appendElement: function (parent, child) {
        // If the child is not an HTML node we assume it is a configuration object to create one.
        if (!child.nodeName) {
            console.log('Calling createElement() with', child);
            child = domUtils.createElement(child);
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
    toggleVisibility: function (el){
        if (el.classList.contains('hidden')) {
            domUtils.unHide(el);
        } else {
            domUtils.hide(el);
        }
    },
    isHTMLNode: function  (obj) {
        return !!obj.nodeName;
    }
}