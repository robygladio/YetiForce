/*+***********************************************************************************************************************************
 * The contents of this file are subject to the YetiForce Public License Version 1.1 (the "License"); you may not use this file except
 * in compliance with the License.
 * Software distributed under the License is distributed on an "AS IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and limitations under the License.
 * The Original Code is YetiForce.
 * The Initial Developer of the Original Code is YetiForce. Portions created by YetiForce are Copyright (C) www.yetiforce.com. 
 * All Rights Reserved.
 *************************************************************************************************************************************/
// Function to generate new password
function generate_password( min, max, allowed_chars ) {
    var password = '';   // variable holding new password
     
    // array of allowed characters that will consist of password
    // if there there is something wrong build the password from only exclamation marks
    if ( typeof(allowed_chars) === 'undefined' )
        allowed_chars = '!'; 
    var chArray = allowed_chars.split(',');
    
    // min length of a password
    if ( typeof(min) === 'undefined' )
        min = 10;   // default 10
        
    // max length of a password
    if ( typeof(max) === 'undefined' )
        max = 15;   // default 15
        
    // get the password lenght
    var passlength = parseInt(Math.random() * (max - min) + min);
        
    var i = 0;    // index for the loop
    
    
    // loop to get random string with *pass_length* characters
    for( i = 0; i<=passlength; i++ ) {
        var charIndex = parseInt( Math.random()*chArray.length );
        password += chArray[charIndex];
    }
    
    // get desired text field
    var passForm = document.getElementsByName( 'password' )[0];
    // change its value to the generated password
    passForm.value = password;
    
    passForm.onchange();    // uruchom even on change
}

function passwordStrength(password, translations)
{ 
    if ( password == '' )
        password = document.getElementById( 'OSSPasswords_editView_fieldName_password' ).value;
        
    var desc = new Array();
    if ( translations == '' ) {
        desc[0] = app.vtranslate('Very Weak');    
        desc[1] = app.vtranslate('Weak');
        desc[2] = app.vtranslate('Better');
        desc[3] = app.vtranslate('Medium');
        desc[4] = app.vtranslate('Strong');
        desc[5] = app.vtranslate('Very Strong');
    }
    else {
        var tstring = translations.split( ',' );
        desc[0] = tstring[0];    
        desc[1] = tstring[1];    
        desc[2] = tstring[2];    
        desc[3] = tstring[3];    
        desc[4] = tstring[4];    
        desc[5] = tstring[5];    
    }

    var score   = 0;

    //if password bigger than 6 give 1 point
    if (password.length > 6) score++;

    //if password has both lower and uppercase characters give 1 point
    if ( ( password.match(/[a-z]/) ) && ( password.match(/[A-Z]/) ) ) score++;

    //if password has at least one number give 1 point
    if (password.match(/\d+/)) score++;

    //if password has at least one special caracther give 1 point
    if ( password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) score++;

    //if password bigger than 12 give another 1 point
    if (password.length > 12) score++;
    
    // password hidden
    if ( password == '' ) {
        document.getElementById("passwordDescription").innerHTML = app.vtranslate('Enter the password');
        document.getElementById("passwordStrength").className = "strength0";
    }
    else if ( password == '**********' ) {
        document.getElementById("passwordDescription").innerHTML = app.vtranslate('Password is hidden');
        document.getElementById("passwordStrength").className = "strength0";
    }
    else {
        document.getElementById("passwordDescription").innerHTML = desc[score];
        document.getElementById("passwordStrength").className = "strength" + score;
    }
}

function showPassword( record ) {
    var passVal = document.getElementById( "OSSPasswords_editView_fieldName_password" ).value;
    var showPassText = app.vtranslate('LBL_ShowPassword');
    var hidePassText = app.vtranslate('LBL_HidePassword');
    
    if ( $('#show-btn').text() == showPassText ) {
        var params = {
            'module' : "OSSPasswords",
            'action' : "GetPass",
            'record' : record
        }
        
        AppConnector.request(params).then(
            function(data) {
                var response = data['result'];
                if (response['success']) {
                    var el = document.getElementById( "OSSPasswords_editView_fieldName_password" );
                    el.value = response['password'];
                    el.onchange();
                }
            },
            function(data,err){
            
            }
        );
                
        // validate password
        passwordStrength('', '');
        
        // change buttons label
        $('#show-btn').text( hidePassText );
        $('#copy-button').show();
    }
    else {
        document.getElementById( "OSSPasswords_editView_fieldName_password" ).value = '**********';
        $('#show-btn').text( showPassText );
        passwordStrength('', '');        
        $('#copy-button').hide();
    }    
}

function showDetailsPassword( record ) {
    var passVal = document.getElementById( "detailPassword" ).innerHTML;
    var showPassText = app.vtranslate('LBL_ShowPassword');
    var hidePassText = app.vtranslate('LBL_HidePassword');
    
    if ( $('#show-btn').text() == showPassText ) {
        var params = {
            'module' : "OSSPasswords",
            'action' : "GetPass",
            'record' : record
        }
        
        AppConnector.request(params).then(
            function(data) {
                var response = data['result'];
                if (response['success']) {
                    var el = document.getElementById( "detailPassword" );
                    el.innerHTML = response['password'];
                }
            },
            function(data,err){
            
            }
        );
        
        // change buttons label
        $('#show-btn').text( hidePassText );
        $('#copy-button').show();
    }
    else {
        document.getElementById( "detailPassword" ).innerHTML = '**********';
        $('#show-btn').text( showPassText );
        $('#copy-button').hide();
    }    
}

function showPasswordQuickEdit( record ) {
    var showPassText = app.vtranslate('LBL_ShowPassword');
    var hidePassText = app.vtranslate('LBL_HidePassword');
    
    var params = {
        'module' : "OSSPasswords",
        'action' : "GetPass",
        'record' : record
    }
    
    AppConnector.request(params).then(
        function(data) {
            var response = data['result'];
            if (response['success']) {
                var el = document.getElementById( "detailPassword" );
                el.innerHTML = response['password'];
                $("input[name='password']").val( response['password'] );
            }            
        },
        function(data,err){
        
        }
    );
    
    // change buttons label
    $('#show-btn').text( hidePassText );
    $('#copy-button').show();
}