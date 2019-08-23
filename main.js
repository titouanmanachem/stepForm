$(document).ready(function(){
    stepForm();
});

var forms = [];
function stepForm(){
    $('.stepForm').each( function(){
        var tabs = [];
        $(this).find('.tab').each(function(){
            var steps = [];
            $(this).find('.step').each( function(){
                var step = new Step(this,$(this).find('input').length);
                steps.push(step);
            });
            var tab = new Tab(this, steps);
            tabs.push(tab);
        });
        var form = new FormStep(this,tabs);
        forms.push(form);
    });
    forms.forEach(function(formStep) {
        formStep.reloadDisplayTab();
    });
}

$('document').ready(function(){
    //Input complete
    $(this).on('change', '.stepForm .tab .step input', function(){
        //add validator
        let form = $(this).closest('.stepForm');
        if(true){
            forms.forEach(function(fS) {
                if( fS.object === form[0] ){
                    fS.completeInput();
                }
            });
        } else {
            forms.forEach(function(fS) {
                if( fS.object === form[0] ){
                    fS.incompleteInput();
                }
            });
        }
    });

    //add more input
    $(this).on( 'click','.stepForm .tab .step .reload', function(){
        var form = $(this).closest('.stepForm');
        forms.forEach(function(fS) {
            if( fS.object === form[0] ){
                this.addStep(fS);
            }
        });
    });

});


class FormStep {
    constructor(object, tabs) {
        this.object = object ;
        this.tabs = tabs ;
        this.currentTab = 0;
        this.nbTabs = tabs.length;
    }

    reloadDisplayStep(){
        $(this.object).find('.actifStep').each(function(){
            $(this).removeClass('actifStep');
        });
        let tab = this.tabs[this.currentTab];
        let step = tab.steps[tab.currentStep].object;
        $(step).addClass('actifStep');
    }

    displayPreviousStep(){
        $(this.object).find('.actifStep').each(function(){
            $(this).removeClass('actifStep');
        });
        let tab = this.tabs[this.currentTab];
        tab.currentStep += 1;
        let step = tab.steps[tab.currentStep].object;

        $(step).addClass('actifStep');
    }

    displayNextStep(){
        console.log('display','next');
        $(this.object).find('.actifStep').each(function(){
            $(this).removeClass('actifStep');
        });
        let tab = this.tabs[this.currentTab].object;
        tab.currentStep += 1;
        let step = tab.steps[tab.currentStep].object;
        $(step).addClass('actifStep');
    }

    reloadDisplayTab(){
        $(this.object).find('.actifTab').each(function(){
            $(this).removeClass('actifTab');
        });
        let tab = this.tabs[this.currentTab].object;
        $(tab).addClass('actifTab');
        this.reloadDisplayStep();
    }

    displayNextTab(){
        $(this.object).find('.actifTab').each(function(){
            $(this).removeClass('actifTab');
        });
        this.currentTab += 1;
        let tab = this.tabs[this.currentTab].object;
        $(tab).addClass('actifTab');
        this.reloadDisplayStep();
    }

    displayPreviousTab(){
        $(this.object).find('.actifTab').each(function(){
            $(this).removeClass('actifTab');
        });
        this.currentTab += -1;
        let tab = this.tabs[this.currentTab].object;
        $(tab).addClass('actifTab');
        this.reloadDisplayStep();
    }

    completeInput(){
        let tab = this.tabs[this.currentTab];
        let step = this.tabs[this.currentTab].steps[tab.currentStep];
        step.inputComplete += 1;
        if( step.nbInput === step.inputComplete ){
            this.displayNextStep();
        }
    }

    incompleteInput(){
        let tab = this.tabs[this.currentTab];
        let step = this.tabs[this.currentTab].steps[tab.currentStep];

        if( step.nbInput === step.inputComplete ){
            step.inputComplete += -1;
        }
    }

    addStep(){
        let tab = this.tabs[this.currentTab];
        let step = this.tabs[this.currentTab].steps[tab.currentStep-1];

        $(step.object).clone().appendTo(tab.object);

        let lastStep = "";
        $(tab.object).find('.step').each(function(){
            lastStep = $(this);
        });

        lastStep.find('input').each( function(){
            $(this).val("");
        });

        let newStep = new Step(lastStep,step.nbInput);

        let i = 0;
        let steps = tab.steps;
        let newSteps = [];
        steps.forEach(function(step_) {
            if( i === tab.currentStep ){
                newSteps.push(newStep);
                newSteps.push(step_);
            } else {
                newSteps.push(step_);
            }
            i = i + 1;
        });

        this.tabs[this.currentTab].steps = newSteps;
        this.reloadDisplayStep(tab);
    }
}

class Tab {
    constructor(object, steps) {
        this.object = object;
        this.steps = steps;
        this.currentStep = 0;
        this.nbSteps = steps.length;
    }

}

class Step {
    constructor(object, nbInput) {
        this.object = object;
        this.inputComplete = 0;
        this.nbInput = nbInput;
    }

}
