 //Displays more options and details for the clicked title - this action fires when a title img is clicked on.
    showFullTitle: function({ dispatch, getters }, $event) {
      if ($event.target.tagName === "IMG") {
        //Napraviti loop kroz listu rezultata i ako kliknuti img ima isti id kao i title na listi, napraviti HTTP request s tim title id-om za dobiti detaljnije podatke
        for (const title of getters.getResultsList) {
          if (+$event.target.id === title.id) {
            dispatch("getDetailedTitleInfo", {
              mutationName: "updateSelectedTitle",
              titleID: title.id,
              poster: title.fullPosterPath,
            });
          }
        }
        router.push("/title_details");
      }
    },