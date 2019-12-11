/*============================================================================================================
  Coprolalia Chrome Extension
  by Dr. Mike
  
  This work is provided without any warranty whatsoever. Use at your own risk.
  This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License.
  However, we can do a Creative Commons BY-SA if you offer me to share the $$$ with me. 
  Email: coprolalia.web@gmail.com  
============================================================================================================*/

var coprolalia = 
{   
  adjectives: ["bloody", "cocksucking", "filthy", "fucked-up", "fucking", "goddamn", "motherfucking", "rotten", "shitty", "stupid"],
  personal: ["assfucker", "asshole", "bastard", "bitch", "bitch", "cocksucker", "crackhead", "cunt", "cuntface", "cuntsucker", "dickhead", "dumbass", "dumbwit", "freak", "fuckup", "fuckwit", "hillbilly", "honk", "idiot", "jackass", "moron", "motherfucker", "old fart", "pussy", "scumbag", "shithead", "son of a bitch"],
  splitLen: 31,  
  
  //----------------------------------------------------------------------------------------------------------
  replaceString: function(str)
  //----------------------------------------------------------------------------------------------------------
  {    
    return str
    
      .replace(
        /\b(the|a|your|my|our|their)\b/gi, 
        '$1 ' + coprolalia.adjectives[Math.floor(Math.random() * coprolalia.adjectives.length)])
      
      .replace(
        /\b(a)n\b/gi, 
        '$1 ' + coprolalia.adjectives[Math.floor(Math.random() * coprolalia.adjectives.length)])
        
      .replace(
        /\b(you)\b/gi, 
        '$1 ' + coprolalia.personal[Math.floor(Math.random() * coprolalia.personal.length)]);
  },
  
  //----------------------------------------------------------------------------------------------------------
  applyTo: function(node)
  //----------------------------------------------------------------------------------------------------------
  {
    var str = '';
    var original = node.data;
    var len;
    var i = 0;
    
    while(i < original.length)
    {
      len = coprolalia.splitLen;
      while(i+len<original.length && !/\s/.test(original[i+len])) len++; // go to next whitespace
      str += coprolalia.replaceString(original.substr(i, len));      
      i += len;    
    }
      
    node.data = str;
  },
  
  //----------------------------------------------------------------------------------------------------------  
  inspect: function(node)
  //----------------------------------------------------------------------------------------------------------
  {
    if(!node) return;
    
    if(node.nodeType == Node.TEXT_NODE)
    {
      coprolalia.applyTo(node);
    } 
    else 
    {
      if(node.nodeType == Node.ELEMENT_NODE) 
      {  
        var exclude = ['title', 'textarea', 'input', 'script', 'pre'];
        var nodeName = node.tagName.toLowerCase();
        var i;
        
        for(i=0; i<exclude.length; i++)
          if(nodeName == exclude[i]) return;
                
        for(i=0; i<node.childNodes.length; i++)
          coprolalia.inspect(node.childNodes[i]);
      }
    }
  },

  //----------------------------------------------------------------------------------------------------------
  start: function()
  //----------------------------------------------------------------------------------------------------------
  { 
  	chrome.runtime.sendMessage({method: "getStatus"}, function(response) {
		  if(response.data == "on")
		  	coprolalia.inspect(document.documentElement);
		});    
  }
};

coprolalia.start();
