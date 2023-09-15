<script lang='ts'>
    export let data;
    setTimeout(() => {
        window.location.replace(data.link);
    }, 2000);
</script>

<body class="bg-gradient-to-b from-[#0E2954] via-[#1F6E8C] to-[#2E8A99]">
    <div class="relative">
        <div class="w-20 h-20 border-purple-200 border-2 rounded-full"></div>
        <div class="w-20 h-20 border-purple-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
    </div>
</body>