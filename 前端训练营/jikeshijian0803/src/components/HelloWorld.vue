<template>
  <div class="app-container">

<div id="container"></div>
  </div>
</template>

<script>
export default {
components: {  },
  name: "test",

  data() {
    return {    
     board:[[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 2, 1, 0, 0, 0],
                [0, 0, 0, 1, 2, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ],
    };
  },
  created() {
    let container = document.getElementById("container");

this.render(container)
  },
   watch: {
    userID: function() {
       if (this.userID == 0)
   { this.resetTemp()}
   else
   {
     
    }}
  },


  methods: {

    render(container) {
    // container.innerHTML = "";
this.board.forEach(element => {
  element.forEach(element => {
let cell=document.createElement("div")
   this.cell.style = "vertical-align:bottom;border:solid 1px white;margin:1px;width:50px;height:50px;background-color:darkgreen;display:inline-block;"
    container.appendChild(this.cell)

  }

  )
  

});
    },
  }
}
</script>

<style>

</style>
