
$(function () {
    
    /*Filter project*/
    let filter = $("[data-filter]");

    filter.on("click", function(event) {
        event.preventDefault();
        let category = $(this).data('filter');
        
        
        $("[data-cat]").each(function() {
            let workCategory = $(this).data('cat');
            
            if(category == 'all'){
                $("[data-cat]").removeClass('hide');
            } else if(workCategory != category) {
                $(this).addClass('hide');
            } else {
                $(this).removeClass('hide');
            }
            
        });
    });
    
    /*modal windows*/
    const modalWin = $("[data-modal]");
    const modalClose = $("[data-close]");
    
    modalWin.on("click", function(event) {
        event.preventDefault();
        
        let $this = $(this);
        let modalId = $this.data('modal');
        
        $(modalId).addClass('show');
        $("body").addClass('no-scroll')
        
        setTimeout(function() {
            $(modalId).find(".modal_dialog").css({
            transform: "rotateX(0)"
        });
        }, 100);
        
        
    });
    
    modalClose.on("click", function(event) {
        event.preventDefault();    
        let $this = $(this);
        let modalParent = $this.parents('.modal');
        
        modalParent.find(".modal_dialog").css({
            transform: "rotateX(90deg)"
        });
        
        setTimeout(function() {
            modalParent.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 100);
    });
    

    $(".modal").on("click", function(event) {
        let $this = $(this);
        
        $this.find(".modal_dialog").css({
            transform: "rotateX(90deg)"
        });
        
        setTimeout(function() {
            $this.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 100);
    });
    
    $(".modal_dialog").on("click", function(event) {
        event.stopPropagation();
    });
    
});