import React from "react";

export default function useStorage(key, def=false) {
	if(localStorage.getItem(key) === null){
		localStorage.setItem(key, def);
	}

  const [item, setValue] = React.useState(() => window.localStorage.getItem(key));

  const setItem = function(newValue){
    setValue(newValue);
    window.localStorage.setItem(key, newValue);
  };

  return [item, setItem];
}