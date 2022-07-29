import fetch from '@system.fetch';
import prompt from '@system.prompt';

export default {
    data: {
        keyword: "我爱鸿蒙",
        headPoem: "李白乘舟将欲行",
        keywordButton: "AI生成藏头诗",
        headPoemButton: "AI生成整首诗",
        placeHolder_keyword: "请输入4个不重复的汉字",
        placeHolder_headPoem: "请输入一两句诗词，逗号分隔"
    },

    onInit() {



    },

    textChangeKey(e) {
        this.keyword = e.text;
    },

    textChangeHead(e) {
        this.headPoem = e.text;
    },

    genHeadPoem() {

        console.log(this.keyword);

        this.keyword = this.keyword.replace(/[\s]+/g, "").replace(/\n/g, "").replace(/\r/g,"")
        console.log(this.keyword);

        if(this.keyword === "") {
            this.showDialog("请输入4个不同的汉字", "藏头诗生成失败");
            return;
        }

        let url = 'https://py.myie9.com/hidepoem/' + this.keyword;
        let that = this;

//        this.resultPoemInput = "";

        fetch.fetch({
            url: url,
            method: 'GET',
            responseType: 'text',
            success: function (ret) {
                console.log(JSON.stringify(ret));
                if (ret.code == 500) {
                    that.showDialog("您太有才我不行，换一个吧", "藏头诗生成失败");
                    return;
                }

                let data = ret.data;
                console.log(data.toString());
                that.showDialog(data.toString(), "藏头诗生成成功！");
            },
            fail:function(data, code) {
                if(data.code == 500) {
                    that.showDialog("您太有才我不行，换一个吧", "藏头诗生成失败");
                } else {
                    that.showDialog("发生错误，请重试！错误码为：" + code + "," + JSON.stringify(data), "AI错误");
                }
            }
        })
    },

    genPoem() {
        console.log(this.headPoem);

        this.headPoem = this.headPoem.replace(/[\s]+/g, "").replace(/\n/g, "").replace(/\r/g,"")
        console.log(this.headPoem);

        if(this.headPoem === "") {
            this.showDialog("请输入一两句诗", "整首诗生成失败");
            return;
        }

        let url = 'https://py.myie9.com/xuxietest/' + this.headPoem;
        let that = this;

//        this.resultPoemInput = "";

        fetch.fetch({
            url: url,
            method: 'GET',
            responseType: 'text',
            success: function (ret) {
                console.log(JSON.stringify(ret));
                if (ret.code == 500) {
                    that.showDialog("您太有才我不行，换一个吧", "整首诗生成失败");
                    return;
                }

                let data = ret.data;
                console.log(data.toString());
                that.showDialog(data.toString(), "整首诗生成成功！");
            },
            fail:function(data, code) {
                if(data.code == 500) {
                    that.showDialog("您太有才我不行，换一个吧", "整首诗生成失败");
                } else {
                    that.showDialog("发生错误，请重试！错误码为：" + code + "," + JSON.stringify(data), "AI错误");
                }
            }
        })

    },

    showDialog(msg, title= '提示') {
        let that = this;
        prompt.showDialog(
            {
                title: title,
                message: msg,
                buttons: [{
                              text: '关闭',
                              color: '#33dd44'
                          }],
                success: function(data) {
                    console.log(JSON.stringify(data));
                    console.log("用户点击关闭按钮");
                },
                cancel: function() {
                    console.log("用户点击按钮，code = ");
                }
            }
        )
    }
};
