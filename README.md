## active-list-comp

**active-list-comp** is a Vue.js component (Vue.js >= 2.5) that provides an input box laid on top of a list display that grows with each new input entry.  Each entry in the list has two icons linked for editing or deleting the item.

 **active-list-comp** can be installed via with the included `package.json` file for a local installation via the [npm install](https://docs.npmjs.com/cli/install.html "npm install") command.  **active-list-comp** depends on the [vue.js](https://vuejs.org/ "Vue.js") framework.  A demo folder is provided that used [Parcel](https://parceljs.org/) together with its associated `package.json` file to bundle together  **active-list-comp's** [github location](https://github.com/deandevl/ActiveListComp.git) with its [vue.js](https://vuejs.org/ "Vue.js") dependency for a simple application.  Further details are provided below for running the demo.

## Props ##
A prop in Vue.js is a custom attribute for passing information from a parent component hosting **active-list-comp** instance(s) to an **active-list-comp** as a child component. 

**active-list-comp** has the following props for a parent to bind and send information to:

  `input_size` -- the maximum number of characters for input (number, default: 20) 

  `title` -- gives a heading over the input box (string, default: null)

  `placeholder` -- a placeholder for the input box (string, default: 'Enter a value')

  `drop_panel_height` -- defines the height of the drop down panel (string, default: '100px')

  `css_variables` -- defines the css variables for quick, easy styling of **active-list-comp**  (object, default: null)

## Styling ##
The `css_variables` prop is a javascript object that contains any combination of css variable names as keys and associated values for quick, limited styling of **active-list-comp** .  The following list is the css variable names along with their default values:

    {
    	active_list_font_family: 'Verdana,serif',
        active_list_title_color: '#4d4d4d',
        active_list_title_font_size: '.8rem',
        active_list_title_font_weight: 'bold',
        
        active_list_input_font_size: '.8rem',
        active_list_input_color: 'darkgray',
        active_list_input-background: 'white',
        active_list_input_placeholder_color: 'gray',
        active_list_input-border: '1px solid black',
        
        active_list_arrow_icon: '\21D3',
        active_list_arrow_color: 'black',
        active_list_edit_icon: '\270E',
        active_list_edit_color: 'black',
        active_list_trash_icon: '\2716',
        active_list_trash_color: 'red',
        
        active_list_panel_position: 'static',
        active_list_panel_z_index: 'auto',
        active_list_items_panel_background: 'transparent',
        active_list_item_color: 'black',
    	active_list_item_border: '1px solid gray'
    }

As an example you could bind the following object to an instance of **active-list-comp** to set the title font size and input color:
    {active_list_title_font_size: '24px', active_list_input_color: 'purple'}

Note that multiple **active-list-comp** children of the parent can each be bound to a unique set of `css_variable` prop objects. To enforce the same styling across all **active-list-comp** children, simply  bind just one `css_variable` prop object to all the  **active-list-comp** children.

## Events ##
To use the component, enter a string in the input box and hit the enter key. A listing panel will begin to scroll out showing the entry.  As new strings are entered, the listing panel continues to grow. Each entry in the list has a pair of icons for editing and deleting the item.  

Under the hood the action is one way from the child component to the parent component.  **active-list-comp** emits one event (named `active_list_comp_items`) and sends the current array of items.  The event is emitted with the array of items whenever **active-list-comp** adds an item, deletes an item, or updates an item. From there it's up to the parent to process the current items.  Events emitted from a child component back to the parent is explained at [Vue Custom Events](https://vuejs.org/v2/guide/components.html#Using-v-on-with-Custom-Events).

## Demonstration ##
A demonstration of **active-list-comp** is provided in the [ActiveListComp](https://github.com/deandevl/ActiveListComp) repository by hosting the `index.html` file under the `dist` folder.  The demo (templated in the `App.vue` file) has a pair of **active-list-comp** children that emit their own events listened to by the parent.  The items array sent by the events are displayed in the console.

As a suggestion, install [http-server](https://www.npmjs.com/package/http-server "http-server") locally/globally via [npm](https://www.npmjs.com/ "npm") then enter the command `http-server`in the **active-list-comp** `dist` directory.  From a browser enter the url: `localhost:8080/` to view the demo.

Here is some example code for using **active-list-comp** taken from the demo's `App.vue` file:

```
<active-list-comp 
  title="My Favorite Fruits"
  placeholder="Enter a fruit"
  :input_size="input_size_fruit"
  :css_variables="css_variables_fruits"
  v-on:active_list_comp_items="show_fruit_items">
</active-list-comp>
```

And the supporting data references:

```
data() {
  return {
    input_size_fruit: 24,
    css_variables_fruits: {
        active_list_items_panel_background: 'lightgreen',
        active_list_panel_position: 'absolute',
        active_list_panel_z_index: '100'
    },
  }
},
methods: {
  show_fruit_items: function(items) {
    console.log(`Fruit Items: ${items}`);
  }
}
```

