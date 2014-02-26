/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-07-13
 * Description: upload file
 */
$(document).ready(function() {
    var url = "upload";
    var form = $("#form_upload");
    var btnSubmit = $('[node-type="btnSubmit"]', form);
    var btnCancel = $('[node-type="btnCancel"]', form);
    var formInputs = $('[node-type="inputArea"]', form);
    var fileInput = $('[node-name="fileInput"]', form);
    var fileArea = $('[node-type="fileArea"]', form);
    var isSubmiting = false;

    form.on("submit", formSubmit);

    fileArea.on("change",function(){
        fileInput.val($(this).val());
    });

    function formSubmit(){
        if(isSubmiting){
            return false;
        }

        isSubmiting = true;
        btnSubmit.val("上传中...");
        var that = this;
        form.ajaxSubmit({
            dataType: "json",
            url: url,
            type: "post",
            success : function(res) {
                console.log(res);
                isSubmiting = false;
                btnSubmit.val("提交");
                if(res.result == 1) {
                    utils.alert(that, "上传文件成功！");
                } else {
                    utils.alert(that, res.message);
                }
            }
        });
        return false;
    }
});