## Directive Arguments:  
 `subject` : The title of your window. IMPORTANT: Note the following format:   
   * If specifying a string inline use the syntax: `subject="'My Title'"`  
   * If specifying a variable name that contains the subject, use the syntax: `subject="myvar"`
   `options` : options is an object containing settings for your usage of the directive. `options="myObj"` where `myObj` is in the form of `{optionName: optionValue}`  

   | Option Name  | Option Value Type | Description |
   | ------------- | ------------- | ------------- |  
   | state | string | Can be either: 'default','maximized', 'minimized', 'closed' |
   | size | object | in the form `{width: value, height: value}` If size is not set, the window will take up as much room as possible. |
   | overflow | string | Either the values `scroll`, `auto`, `hidden`, `y-scroll`, `x-scroll`  |
   | position | object | in the form `{x: value, y: value}` where value is a number and does NOT specify a type like px or percent |


  **states:**  
  closed : directive is hidden from view.  
  maximized: directive overlays max space.  
  minimized : directive is hidden, - and if queue is present, places an associated item in it.  
  default: directive is shown using default sizes; Size can override this behavior.  
