<template>
  <div>
    <DataTable :value="books" :rows="10" >
      <Column header="Авторы">
        <template #body="model">
          {{ getAuthors(model) }}
        </template>
      </Column>
      <Column header="Название">
        <template #body="model">
          {{ getTitle(model) }}
        </template>
      </Column>

      <Column>
        <template #body="model">
          <Button @click="deleteFromFavourites(model)">Удалить</Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
export default {
  data(){
    return {
      books:[],
      totalRecordsBooks:0,
      loadingBooks:false,
      startIndex:0
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    search(){
      let favourites = JSON.parse(localStorage.favourites);
      this.books = favourites.map(function (elem) {
        return elem[1];
      });
    },
    getAuthors(authors){
      if(typeof authors != 'undefined' && typeof authors.data !='undefined'
          && typeof authors.data.volumeInfo !='undefined' && typeof authors.data.volumeInfo.authors !='undefined'){
        return authors.data.volumeInfo.authors.join(" ")
      }
    },
    getTitle(model){
      if(typeof model != 'undefined' && typeof model.data !='undefined'
          && typeof model.data.volumeInfo !='undefined'  && typeof model.data.volumeInfo.title !='undefined'){
        return model.data.volumeInfo.title;
      }
    },
    onPageBooks(event){
      this.startIndex = event.first;
      this.search();
    },
    deleteFromFavourites(model){
      if(typeof model != 'undefined' && typeof model.data !='undefined'
          && typeof model.data.volumeInfo !='undefined'  && typeof model.data.id !='undefined'){
        let favourites = localStorage.getItem('favourites');
        if(favourites != null){
          favourites = new Map(JSON.parse(localStorage.favourites));
          favourites.delete(model.data.id)
          localStorage.favourites = JSON.stringify(Array.from(favourites.entries()));
          this.search();
        }

      }
    }
  }
}
</script>
