<template>
  <div class="activeList">
    <div class="activeList_title">{{title}}</div>
    <section class="activeList_inputSec">
      <div
          :class="[is_open ? 'activeList_arrowIcon__open' : 'activeList_arrowIcon__closed']"
          v-on:click="arrow_clicked">
      </div>
      <input
          class="activeList_input"
          :size="input_size"
          :placeholder="placeholder"
          v-model="input_value"
          v-on:change="add_item">
    </section>

    <div class="activeList_listSec" v-if="items.length > 0">
      <ul class="activeList_list">
        <div class="activeList_panel" :style="panel_style">
          <li v-for="(item,index) in items" :key="index">
            <div class="activeList_noEditBox" v-if="!item.editing">
              <span>{{item.value}}</span>
              <div class="activeList_editIcon" v-on:click="turn_on_edit(item)"></div>
              <div class="activeList_trashIcon" v-on:click="trash_item(item)"></div>
            </div>
            <div v-else-if="item.editing">
              <input
                  class="activeList_input"
                  :size="input_size"
                  :placeholder= "input_list_placeholder"
                  v-model="input_list_value"
                  v-on:change="update_item"
                  v-on:focusout="input_focusout(item)">
            </div>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ActiveListComp',
    data(){
      return {
        input_value: null,
        input_list_value: null,
        input_list_placeholder: 'Update item',
        items: [],
        is_open: false,
        current_edit_item: null,
        panel_style: 'width: 0; height: 0; transition: all 3s; opacity: 0;'
      }
    },
    props: {
      input_size: {
        type: Number,
        default: 20
      },
      title: {
        type: String,
        default: null
      },
      placeholder: {
        type: String,
        default: 'Enter a value'
      },
      drop_panel_height: {
        type: String,
        default: '100px'
      },
      css_variables: {
        type: Object,
        default: () => {
          return null;
        }
      }
    },
    methods: {
      input_focusout: function(item){
        item.editing = false;
      },
      compute_placeholder: function(item){
        return 'Update ' + item.value;
      },
      add_item: function(){
        if(this.input_value !== null){
          this.items.push({value: this.input_value, editing: false});
          if(!this.is_open){
            this.toggle_state();
          }
        }
        //child to parent -- after add send items
        this.emit_items();
      },
      turn_on_edit: function(item){
        this.current_edit_item = item;
        this.input_list_placeholder = 'Update ' + item.value;
        item.editing = true;
      },
      update_item: function(){
        if(this.input_list_value !== null){
          this.current_edit_item.value = this.input_list_value;
          this.current_edit_item.editing = false;
          //child to parent -- after update send items
          this.emit_items();
          this.current_edit_item = null;
        }
      },
      trash_item: function(item){
        const idx = this.items.indexOf(item);
        this.items.splice(idx,1);
        this.input_value = null;
        if(this.items.length === 0){
          this.toggle_state();
        }
        //child to parent -- after delete send items
        this.emit_items();
      },
      arrow_clicked: function(){
        this.toggle_state();
      },
      toggle_state: function(){
        if(this.is_open){
          this.is_open = false;
          this.panel_style = 'height: 0;transition: all 3s; opacity: 0;';
          if(this.current_edit_item !== null){
            this.current_edit_item.editing = false;
            this.current_edit_item = null;
          }
        }else {
          this.is_open = true;
          this.panel_style = 'height: ' + this.drop_panel_height + ';transition: all 3s; opacity: 1.0;';
        }
      },
      emit_items: function(){
        const items = [];
        for(let item of this.items){
          items.push(item.value);
        }
        this.$emit('active_list_comp_items',items);
      }
    },
    mounted(){
      if(this.css_variables !== null){
        for(let key of Object.keys(this.css_variables)){
          this.$el.style.setProperty(`--${key}`, this.css_variables[key]);
        }
      }
    }
  }
</script>

<style lang="less">
  :root {
    --active_list_font_family: Verdana,serif;
    --active_list_title_color: #4d4d4d;
    --active_list_title_font_size: .8rem;
    --active_list_title_font_weight: bold;

    --active_list_input_font_size: .8rem;
    --active_list_input_color: darkgray;
    --active_list_input_background: white;
    --active_list_input_placeholder_color: gray;
    --active_list_input_border: 1px solid black;

    --active_list_arrow_icon: '\21D3';
    --active_list_arrow_color: black;
    --active_list_edit_icon: '\270E';
    --active_list_edit_color: black;
    --active_list_trash_icon: '\2716';
    --active_list_trash_color: red;

    --active_list_panel_position: static;
    --active_list_panel_z_index: auto;
    --active_list_items_panel_background: transparent;
    --active_list_item_color: black;
    --active_list_item_border: 1px solid gray;
  }

  .activeList {
    font-family: var(--active_list_font_family);

  &_title {
     color: var(--active_list_title_color);
     font-size: var(--active_list_title_font_size);;
     font-weight: var(--active_list_title_font_weight);
     align-self: center;
     margin-bottom: .5rem;
   }

  &_inputSec {
     display: flex;
     flex-direction: row;
   }

  &_arrowIcon__closed::before {
     content: var(--active_list_arrow_icon);
     display: inline-block;
     color: var(--active_list_arrow_color);
     transform: rotate(-90deg);
     transition: 600ms linear all;
     margin-right: .2rem;
     font-size: 1rem;
     cursor: pointer;
   }
  &_arrowIcon__open::before {
     content: var(--active_list_arrow_icon);
     display: inline-block;
     color: var(--active_list_arrow_color);
     transition: 600ms linear all;
     margin-right: .2rem;
     font-size: 1rem;
     cursor: pointer;
   }

  &_input {
     font-size: var(--active_list_input_font_size);
     color: var(--active_list_input_color);
     background: var(--active_list_input_background);
     border: var(--active_list_input_border);

  &::-webkit-input-placeholder {
     font-style: italic;
     font-weight: 300;
     color: var(--active_list_input_placeholder_color,gray);
   }
  }

  &_listSec {
     margin-top: .5rem;
   }

  &_list {
     margin: 0;
     padding: 0;
     list-style: none;
   }

  &_panel {
     background: var(--active_list_items_panel_background);
     border-bottom-left-radius: 4px;
     border-bottom-right-radius: 4px;
     color: var(--active_list_item_color);
     position: var(--active_list_panel_position);
     z-index: var(--active_list_panel_z_index) ;
     overflow: auto;
     width: max-content;
     padding: .5rem;

  &::-webkit-scrollbar-track {
     background-color: #F5F5F5;
     border-radius: 10px;
     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
   }
  &::-webkit-scrollbar {
     background-color: transparent;
     width: 0.75rem;
     height: 0.75rem;
   }
  &::-webkit-scrollbar-thumb {
     background-color: #D62929;
     border-radius: 10px;
     -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
   }
  }

  &_noEditBox {
     display: flex;
     flex-direction: row;
   }

  &_editIcon::before {
     content: var(--active_list_edit_icon);
     color: var(--active_list_edit_color);
     display: inline-block;
     margin-left: .75rem;
     cursor: pointer;
   }

  &_trashIcon::before {
     content: var(--active_list_trash_icon);
     color: var(--active_list_trash_color);
     display: inline-block;
     margin-left: .75rem;
     cursor: pointer;
   }
  }
</style>
<style scoped>
  .activeList {
    font-family: var(--active_list_font_family);
  }
  .activeList_title {
    color: var(--active_list_title_color);
    font-size: var(--active_list_title_font_size);
    font-weight: var(--active_list_title_font_weight);
    align-self: center;
    margin-bottom: 0.5rem;
  }
  .activeList_inputSec {
    display: flex;
    flex-direction: row;
  }
  .activeList_arrowIcon__closed::before {
    content: var(--active_list_arrow_icon);
    display: inline-block;
    color: var(--active_list_arrow_color);
    transform: rotate(-90deg);
    transition: 600ms linear all;
    margin-right: 0.2rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .activeList_arrowIcon__open::before {
    content: var(--active_list_arrow_icon);
    display: inline-block;
    color: var(--active_list_arrow_color);
    transition: 600ms linear all;
    margin-right: 0.2rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .activeList_input {
    font-size: var(--active_list_input_font_size);
    color: var(--active_list_input_color);
    background: var(--active_list_input_background);
    border: var(--active_list_input_border);
  }
  .activeList_input::-webkit-input-placeholder {
    font-style: italic;
    font-weight: 300;
    color: var(--active_list_input_placeholder_color, gray);
  }
  .activeList_listSec {
    margin-top: 0.5rem;
  }
  .activeList_list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .activeList_panel {
    background: var(--active_list_items_panel_background);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    color: var(--active_list_item_color);
    position: var(--active_list_panel_position);
    z-index: var(--active_list_panel_z_index);
    overflow: auto;
    width: max-content;
    padding: 0.5rem;
  }
  .activeList_panel::-webkit-scrollbar-track {
    background-color: #F5F5F5;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .activeList_panel::-webkit-scrollbar {
    background-color: transparent;
    width: 0.75rem;
    height: 0.75rem;
  }
  .activeList_panel::-webkit-scrollbar-thumb {
    background-color: #D62929;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .activeList_noEditBox {
    display: flex;
    flex-direction: row;
  }
  .activeList_editIcon::before {
    content: var(--active_list_edit_icon);
    color: var(--active_list_edit_color);
    display: inline-block;
    margin-left: 0.75rem;
    cursor: pointer;
  }
  .activeList_trashIcon::before {
    content: var(--active_list_trash_icon);
    color: var(--active_list_trash_color);
    display: inline-block;
    margin-left: 0.75rem;
    cursor: pointer;
  }
</style>