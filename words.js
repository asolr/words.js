
function lex()
{
  var txt = document.getElementById("input_text").value;
  var map = lexer(txt);
  document.getElementById("word_frequency").innerHTML = JSON.stringify(map);
}

function frequency()
{
  var txt = document.getElementById("input_text").value;
  var map = frequencyI(txt);
  document.getElementById("word_frequency").innerHTML = JSON.stringify(map);
}

function frequencyI(text)
{
  var words = text.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/); // note ' and - are kept
  var map = words.reduce(function(m,e){
    m[e] = (+m[e]||0)+1; return m
  },{});
  return objsort(map);
}

function frequencyII(text)
{
  var words = text.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/); // note ' and - are kept
  var map = {};
  for(var i=0;i<words.length;++i)
  {
    if(! (words[i] in map))
    map[words[i]]=1;
    else
    map[words[i]]+=1;
  }
  return objsort(map);
}

// map the object to an array [key, obj[key]]
function objsort(obj)
{
  var min_word_size = 4;
  return Object.keys(obj).map(function(key){if(key.length < min_word_size) {delete key;}
    else {return [key, obj[key]] }}).sort(function (keya, keyb){return keyb[1] - keya[1];});
  }

function print_frequency()
{
  var txt = document.getElementById("input_text").value;
  var map = frequency(txt);
  document.getElementById("word_frequency").innerHTML = JSON.stringify(map);
}

function lexer(text)
{
  var words = new Lexer().lex(text);
  var taggedWords = new POSTagger().tag(words);
  var result = "";
  for (i in taggedWords) {
    var taggedWord = taggedWords[i];
    var word = taggedWord[0];
    var tag = taggedWord[1];
    // Note the use of document.writeln instead of print
    result += (word + " /" + tag + "<br/>");
  }
  document.getElementById("tagged_text").innerHTML = result;
}
