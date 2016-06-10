function install() {
    if (localStorage.getItem('install_time'))
        return;

    var now = new Date().getTime();
    localStorage.setItem('install_time', now);
    chrome.tabs.create({url: "options.html"});
}
install();

function apply_diff() {
    // Find all of the elements to work with.
    $('.activity-old-val').each(function(){

        // Make somewhere to put the diff if we haven't already done so.
        if (!($(this).parent().find('td.activity-diff').length)) {
            $(this).parent().append('<td class="activity-diff"></td>');
            $(this).closest('table').find('th').each(function(){ $(this).width('25%')});
            $(this).closest('table').find('td').each(function(){ $(this).width('25%')});
        }

        var dmp = new diff_match_patch();
        dmp.Diff_Timeout = parseFloat(1);
        dmp.Diff_EditCost = parseFloat(4);

        var text1 = $(this).text().trim();
        var text2 = $(this).next().text().trim();
        var raw_diff = dmp.diff_main(text1, text2);
        dmp.diff_cleanupSemantic(raw_diff);
        var cleaned_diff = dmp.diff_prettyHtml(raw_diff);

        $(this).parent().find('td.activity-diff').html(cleaned_diff);
    });
}

chrome.storage.sync.get("jiraUrls", function (result) {
    var jiraUrls = result.jiraUrls;

    if (jiraUrls) {
        var urls = jiraUrls.split(",");
        for(var c = 0; c < urls.length; c++) {
            // Only apply the rules to Jira URLs as defined in the options
            if (location.href.toLowerCase().indexOf(urls[c].toLowerCase()) != -1) {
                apply_diff();
            }
        }
    }
});

