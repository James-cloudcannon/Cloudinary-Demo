export default () => {
    return {
        show: false,
        open: false,
        usesPagefind: false,
        loading: false,
        pagefind: "",
        isMobile: window.innerWidth < 768,
        filters: {
            framework: [],
            category: [],
            location: [],
        },
        pagefindResults: [],
        pagefindSearchResults: [],

        init() {
            this.setUsesPagefind();
            window.addEventListener('resize', () => {
                this.isMobile = window.innerWidth < 768;
            });

        },


        async initialisePagefind() {
            if (this.pagefind) {
                this.setupPagefind();
            } else {
                try {
                    this.pagefind = await import("/_pagefind/pagefind.js");
                    this.setupPagefind();
                } catch (e) {
                    this.error = 'Failed to load search, please refresh';
                    this.loading = false;
                }
            }
        },
        
        async setupPagefind() {
            this.dataReadyForFiltering = false;
            this.loading = true;
        
            if (this.usesPagefind) {
                try {
                    const allResults = await this.pagefind.search(null, {
                        filters: {
                            site: 'Blog'
                        },
                        sort: {
                            date: "desc"
                        }
                    });
        
                    const dataPromises = allResults.results.map(result => result.data());
                    this.pagefindSearchResults = await Promise.all(dataPromises);
                    this.dataReadyForFiltering = true;
                    this.loading = false;
                } catch (e) {
                    this.error = 'Failed to load search, please refresh';
                    this.loading = false;
                }
            }
        },
        
 

        get selectedOptions() {
            return Object.entries(this.filters);
        },


        toggleLoadingState(isLoading) {
            this.loading = isLoading;
        },

        clearPagefindResults() {
            this.pagefindResults = [];
        },
        

        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },


        setUsesPagefind() {
            // Set usesPagefind to true if an element with id 'page-find' exists, otherwise set it to false.
            this.usesPagefind = document.getElementById('pagefind-filtering') ? true : false;
        },

        areAnyFiltersSelected(filters){
            return Object.values(filters).some(filterArray => filterArray.length > 0);
        },

        toggleElementVisibility(elementId, isVisible){
            document.getElementById(elementId).classList.toggle("hidden", !isVisible);
        },
    
        clearResultsContainer(){
            const resultsContainer = document.getElementById("results");
            while (resultsContainer.firstChild) {
                resultsContainer.removeChild(resultsContainer.firstChild);
            }
        },


        toggleDropdown(index) {
            // opens and closes the dropdown menu
            this.open = this.show !== index || !this.open;
            this.show = this.open ? index : false;
        },

        toggleCheckboxEvent(event, option, filterType) {
            event.stopPropagation();
            const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                this.addOrRemoveFilterOptionAndUpdateRenderedItems(option, checkbox.checked, filterType);
            }
        },

        generateFilterButtonLabelBasedOnSelectionAndDevice(filterType, filterName) {
            // updates the button labels depending on the number of filters selected, and if the user is on mobile
        //    const selectedCount = this.filters[filterType]?.length || 0;
            //const pluralizeFilterName = filterType === 'category' ? 'categories' : `${filterName}s`;

          /*  if (!selectedCount) {
                return `Filter by ${filterName}`;
            }*/

            const filterText = `Filter by ${filterName}`;

            /*if (selectedCount === 1 && this.isMobile) {
                return `Filtered by 1 ${filterName}`;
            }*/

            return filterText;
        },
        

        addOrRemoveFilterOptionAndUpdateRenderedItems(option, isChecked, filterType) {
            const filterArray = this.filters[filterType];
            if (!filterArray) {
                console.error(`Invalid filter type: ${filterType}`);
                return;
            }
            option = option.toLowerCase().replace(/ /g, '-');
            
            if (isChecked && !filterArray.includes(option)) {
                filterArray.push(option);

            } else if (!isChecked) {
                const optionIndex = filterArray.indexOf(option);
                if (optionIndex !== -1) {
                    filterArray.splice(optionIndex, 1);
                }
            }
            this.updateShownPostsBasedOnPagefindUsage();
        },

        addOrRemoveOptionFromAllFilterTypes(option, isAdd = true) {
            // updates the filters object - adds or removes the option from the filters object
            Object.entries(this.filters).forEach(([filterType, filterArray]) => {
                const optionIndex = filterArray.indexOf(option);

                if (isAdd && optionIndex === -1) {
                    filterArray.push(option);
                } else if (!isAdd && optionIndex !== -1) {
                    filterArray.splice(optionIndex, 1);
                }
            });
        },

        removeOptionFromFilter(option) {
            const selector = `input[type="checkbox"]`;
            Array.from(document.querySelectorAll(selector)).forEach(input => {
                const inputValue = input.value.toLowerCase().replace(/ /g, '-');
                const optionValue = option.toLowerCase().replace(/ /g, '-');
                if (inputValue === optionValue) {
                    input.checked = false;
                }
            });
            this.addOrRemoveOptionFromAllFilterTypes(option, false);

            this.updateShownPostsBasedOnPagefindUsage();
        },

        removeAllOptionsFromFilter() {
            const selector = 'input[type="checkbox"]';
            Array.from(document.querySelectorAll(selector)).forEach(input => {
                input.checked = false;
            });
            if (this.usesPagefind) {
                this.toggleElementVisibility("no-results", false);
            }
            this.filters = { framework: [], category: [], location: [] };
            
            this.updateShownPostsBasedOnPagefindUsage();
        },



        updateShownPostsBasedOnPagefindUsage() {
                // stores all list items in an array and passes it to the updateShownPostsWithoutPagefind function
                if (this.usesPagefind){
                    this.debounce(this.updateShownPostsWithPagefind(this.filters),50);
                }else{
                    const templateLists = Array.from(document.querySelectorAll(".cc-list"));
                    //const templateList = Array.from(document.querySelectorAll('#list-item'));
                    this.updateShownPostsWithoutPagefind(templateLists, this.filters);
                }
            
        },
         

        updateShownPostsWithoutPagefind(templateLists, filters) {
            const anyFiltersSelected = this.areAnyFiltersSelected(filters);
            const noResults = document.querySelector('#no-results');
            let anyResultsAvailable = false;
            templateLists.forEach(templateList => {

                //const listWrapper = templateList.querySelector('.list-wrapper');
                let isResultAvailable = false;
                
                // loop through each template and check if it the item in the filter matches the item in the data attribute
                templateList.querySelectorAll('.cc-list-item').forEach(template => {
                    const isMatched = !anyFiltersSelected || Object.entries(filters).every(([filterKey, filterValues]) =>
                    filterValues.length === 0 || filterValues.some(value =>
                        template.getAttribute(`data-${filterKey}`).split(' ').includes(value)
                        )
                    );
                        
                    if (isMatched) {
                        isResultAvailable = true;
                        anyResultsAvailable = true;
                    }
                    
                    template.classList.toggle('hidden', !isMatched);
                });
                
                templateList.classList.toggle('hidden', !isResultAvailable);
            })
            noResults.classList.toggle('hidden', anyResultsAvailable);
        },


        isResultPassingFilter(result, filters) {
            if (!result.filters) return false; 
          
            for (let [filterKey, filterValues] of Object.entries(filters)) {
              if (filterValues.length === 0) continue; 
              if (!result.filters[filterKey]) return false; 

              const isValuePresent = filterValues.some(value => result.filters[filterKey].includes(value));
              if (!isValuePresent) return false; 
            }
          
            return true;
          },

        
        async updateShownPostsWithPagefind(filters) {
            this.toggleLoadingState(true); 

            const areFiltersActive = this.areAnyFiltersSelected(filters);

            if (!areFiltersActive) {
                this.pagefindResults = [];
                this.toggleElementVisibility("post-container", true);
                this.toggleElementVisibility("pagination-container", true);
                this.toggleLoadingState(false); 
                return;
            }
        
           // Filter results based on the filters object.
           
          
          this.pagefindResults = this.pagefindSearchResults.filter(result => this.isResultPassingFilter(result, this.filters));
           
        
            // Check if there are any results after filtering
            this.toggleElementVisibility("no-results", this.pagefindResults.length === 0);
            this.toggleElementVisibility("post-container", false);
            this.toggleElementVisibility("pagination-container", false);
        
            this.toggleLoadingState(false); 
        }
        
        
    }

       
}
