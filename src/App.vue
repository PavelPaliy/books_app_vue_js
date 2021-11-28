<template>
  <div>
    <InputText v-model="query"/>
    <Button label="Поиск"  @click="search"/>

    <DataTable :value="books" :rows="10" @page="onPageBooks($event)"
               :paginator="true"
               responsiveLayout="scroll" :lazy="true" :totalRecords="totalRecordsBooks" :loading="loadingBooks">
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
          <Button @click="addToFavourites(model)">Добавить в избранное</Button>
        </template>
      </Column>
    </DataTable>
  </div>

</template>

<script>



export default {
  data () {
    return {
      query:"",
      books:[],
      model:{},
      totalRecordsBooks:0,
      loadingBooks:false,
      startIndex:0
    }
  },
  mounted() {

  },
  methods: {
    search(){
      let that = this;
      this.axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.query}&startIndex=${this.startIndex}`).then(function({data}) {
        that.books = data.items;
        that.totalRecordsBooks = data.totalItems;
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
    addToFavourites(model){
      let favourites = localStorage.getItem('favourites');
      if(favourites == null){
        favourites = new Map();
      }
      else{
        favourites = new Map(JSON.parse(localStorage.favourites));
      }
      favourites.set(model.data.id,model.data);
      localStorage.favourites = JSON.stringify(Array.from(favourites.entries()));
    }
  }
}
</script>

<style>

</style>
