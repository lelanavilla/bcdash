var availableRules = {
    mongoObjectId : function(name, value, schema) {
        
        // Applies a regex for mongo object ids
        var pattern = "^[a-zA-Z0-9]{24}$";
        
        if(name.toUpperCase().indexOf("ID") != -1 && typeof value == "string" &&  new RegExp(pattern).test(value)) {
            schema.pattern = pattern;
        }
        
        return schema;
    },
  uuid : function(name, value, schema) {
        
        // Applies a regex for mongo object ids
        var pattern = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$";
        
        if(name.toUpperCase().indexOf("ID") != -1 && typeof value == "string" &&  new RegExp(pattern).test(value)) {
            schema.pattern = pattern;
        }
        
        return schema;
    },
    currency : function(name, value, schema) {
        
        // Applies a regex for mongo object ids
        var pattern = "^[A-Z]{3}$";
        
        if(name.toUpperCase().indexOf("CURRENCY") != -1 && typeof value == "string" &&  new RegExp(pattern).test(value)) {
            schema.pattern = pattern;
        }
        
        return schema;
    }
}

var rulesToApply = []; // TODO: Filter

for(prop in availableRules) {
    if(typeof availableRules[prop] === "function") {
        rulesToApply.push(availableRules[prop]);
    }
}

console.log("Starting processing...");

function processFieldByType(fieldName, fieldValue) {

    switch(typeof fieldValue){
        case "string": 
            return processString(fieldValue);
        case "number": 
            return processNumber(fieldValue);
        case "boolean": 
            return processBoolean(fieldValue);
        case "object": 
            if(Array.isArray(fieldValue)) {   
                return processArray(fieldValue);
            } else {
                return processObject(fieldValue);
            }
        default:
            console.log("Unknown type. Field: " + fieldName + ". Type: " + typeof fieldValue);
    }
    return null;
}

function applyRules(fieldName, fieldValue, fieldSchema) {
    
    for(var i=0;i<rulesToApply.length;i++) {
        fieldSchema = rulesToApply[i](fieldName, fieldValue, fieldSchema);
    }
    
    return fieldSchema;
}

function processField(fieldName, fieldValue) {
    
    return applyRules(fieldName, fieldValue, processFieldByType(fieldName, fieldValue))
}

function processString(str) {
    // TODO: RegEx pattern
    return {"type": "string"};
}

function processBoolean(bool) {
    return {"type": "boolean"};
}


function processArray(arr) {
    var sch =  {"type": "array"};
    
    // TODO: Support multiple types using anyOf
    if(arr.length > 0) {
        sch.items = {}
        sch.items = processField("ArrayItem", arr[0]);
    }
    
    return sch;
}

function processNumber(num) {
    
    var sch = {};
    
    //TODO: RegEx?
    if(num.toString().indexOf(".") == -1) {
        sch.type = "integer";
    }
    else {
        sch.type = "number";
    }
        
    return sch;
}

function processObject(obj) {
    
    
    var objSch = {"type": "object", "properties": {}};
    
        
    var propName; // To prevent recursive methods changing it
    for(prop in obj) {
        propName = prop;
        objSch.properties[prop] = processField(prop, obj[prop]);
    }
       
    
    return objSch;
}

function process() {
// Try to parse the input json
  try {
      var src = JSON.parse(document.getElementById('src').value);
    
    document.getElementById('src').value = JSON.stringify(src, null, 2);
  }
  catch (err) {
      alert("Error while parsing input:" + err);
  }

  // Create the schema root object
  var schema = { 
      "$schema": "#",
      "id": "http://YOUR_ROOT_URL/schemas/SCHEMA_NAME.json",
      "type": "object"
  }
  var rootObj= processObject(src);
  schema["properties"] = rootObj["properties"];

  // Output the schema
  var tgt = JSON.stringify(schema, null, 2);
  console.log(tgt);
  
  document.getElementById('tgt').value = tgt;

  console.log("Processing complete.");
}