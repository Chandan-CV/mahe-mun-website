<script lang='ts'>

    export let placeholderName: string;
    export let labelName: string;
    export let value;
    export let errorText: string;
</script>

<div class="mb-2">
    <label
        for="helper-text"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >{labelName}*</label
    >
    <input
        type="text"
        id="helper-text"
        aria-describedby="helper-text-explanation"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="{placeholderName}"
        bind:value={value}
    />
    <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {errorText}
    </p>
</div>