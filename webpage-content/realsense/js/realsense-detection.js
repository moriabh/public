function ValidatePlatform() {
 
    $("#platform-runtime-missing").hide();
    $("#platform-ready").hide();
    $("#platform-dcm-missing").hide();
    
    
    // check platform compatibility
    intel.realsense.SenseManager.detectPlatform(['hand', 'face', 'voice', 'nuance_en_us_cnc'],['front']).then(function (info) {
     
        
        if (info.nextStep == 'ready') {
            
            //good to go
            console.log("realsense good");
            $("#platform-ready").show(200);
          
        }
        else if (info.nextStep == 'unsupported') {
            console.warn(' Platform is not supported for Intel(R) RealSense(TM) SDK: either you are missing the required camera, or your OS and browser are not supported ');
            
        } else if (info.nextStep == 'driver') {
            console.warn('Please upgrade RealSense(TM) Depth Camera Manager (DCM) and firmware before running the application  http://www.intel.com/realsense  ');
             $("#platform-dcm-missing").show(200);
            
         
        } else if (info.nextStep == 'runtime') {
            console.warn('please download and install runtime exe');
            $("#platform-runtime-missing").show(200);
           
        }

    }).catch(function (error) {
         console.warn('other unknown failure. '+ JSON.stringify(error));
       
    });
}


$(document).ready(function() {
    ValidatePlatform();
 
    $('#detectPlatformAgainBT').click(function() {
        ValidatePlatform();
    });
});