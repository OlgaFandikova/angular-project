import { Component, Input } from '@angular/core';

@Component({
    selector: 'panel',
    templateUrl: 'panel.template.html',
    styleUrls: ['panel.style.scss']
})
export class PanelComponent {

    @Input()
    public header: string;

    @Input()
    public total: number;

}