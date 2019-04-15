var permute = function(nums) {
    let res = []
    let used = []
    function Permutation(nums, index, p) {
        if (index === nums.length) {
            res.push(p)
            return
        }
        for (let i = 0;i < nums.length;i++) {
            if (!used[i]) {
                p.push(nums[i])
                used[i] = true
                Permutation(nums, index + 1, p)
                p.pop()
                used[i] = false

            }
        }
        return
    }
    if (!nums.length) {
        return res
    }
    Permutation(nums, 0, [])
    return res
};
console.log(permute([1,2]));
