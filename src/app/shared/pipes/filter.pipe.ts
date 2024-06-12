import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name:'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return item.nombre.toLowerCase().includes(searchText);
    });
  }
}
