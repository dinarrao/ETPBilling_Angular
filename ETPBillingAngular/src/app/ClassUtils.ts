import * as $ from 'jquery';

export class ClassUtils {
   
static formatDate_for_apicall(d: Date): string
{
    var d_string = d.getFullYear()+''+  (d.getMonth()+1).toString().padStart(2,"0") +''+ (d.getDate()).toString().padStart(2,"0");
    return d_string;
}   

static formatDate_display_DDMMYYYY(d: Date, days: number): string
{
  var d_string =(d.getDate()+days).toString().padStart(2,"0") +"/"+ (d.getMonth()+1).toString().padStart(2,"0") +"/"+d.getFullYear();
  return d_string;
}
static ValidateNonEmpty(obj) {
    
  if ($(obj).val() == "") {
      $(obj).addClass("input-validation-error");
      return false;
  }
  else {
      $(obj).removeClass("input-validation-error");
      return true;
  }

}
}
