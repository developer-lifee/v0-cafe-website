
const fs = require('fs');
const path = require('path');

const MENU_FILE_PATH = path.join(process.cwd(), 'public', 'menu.json');

function validateMenu() {
    console.log(`Validating ${MENU_FILE_PATH}...`);

    try {
        const fileContent = fs.readFileSync(MENU_FILE_PATH, 'utf8');
        const data = JSON.parse(fileContent);

        const errors = [];

        if (!data || typeof data !== 'object' || !Array.isArray(data.categories)) {
            errors.push("Root must be an object with a 'categories' array.");
            return printErrors(errors);
        }

        const categoryIds = [];
        const itemIds = [];

        data.categories.forEach((category, catIndex) => {
            // Validate Category
            if (!category.id) errors.push(`Category at index ${catIndex} missing 'id'.`);
            else categoryIds.push(category.id);

            if (!category.title) errors.push(`Category ${category.id || catIndex} missing 'title'.`);

            if (!Array.isArray(category.items)) {
                errors.push(`Category ${category.id || catIndex} missing 'items' array.`);
                return;
            }

            // Validate Items
            category.items.forEach((item, itemIndex) => {
                const itemRef = item.id || `index-${itemIndex}`;

                if (!item.id) errors.push(`Item at index ${itemIndex} in category ${category.id} missing 'id'.`);
                else itemIds.push(item.id);

                if (!item.name) errors.push(`Item ${itemRef} in category ${category.id} missing 'name'.`);

                if (item.price === undefined || typeof item.price !== 'number') {
                    errors.push(`Item ${itemRef} in category ${category.id} has invalid or missing 'price'.`);
                }

                // Validate Option Groups
                if (item.optionGroups) {
                    if (!Array.isArray(item.optionGroups)) {
                        errors.push(`Item ${itemRef} 'optionGroups' must be an array.`);
                    } else {
                        const groupIds = [];
                        item.optionGroups.forEach((group, groupIndex) => {
                            const groupRef = group.id || `index-${groupIndex}`;

                            if (!group.id) errors.push(`OptionGroup at index ${groupIndex} in item ${itemRef} missing 'id'.`);
                            else groupIds.push(group.id);

                            if (!Array.isArray(group.options)) {
                                errors.push(`OptionGroup ${groupRef} in item ${itemRef} missing 'options' array.`);
                                return;
                            }

                            const optionIds = [];
                            group.options.forEach((option, optIndex) => {
                                const optRef = option.id || `index-${optIndex}`;
                                if (!option.id) errors.push(`Option at index ${optIndex} in group ${groupRef} missing 'id'.`);
                                else optionIds.push(option.id);

                                if (option.price === undefined || typeof option.price !== 'number') {
                                    errors.push(`Option ${optRef} in group ${groupRef} has invalid 'price'.`);
                                }
                            });

                            // Check duplicate option IDs in group
                            const dupOpts = getDuplicates(optionIds);
                            if (dupOpts.length > 0) {
                                errors.push(`Duplicate option IDs in group ${groupRef} of item ${itemRef}: ${dupOpts.join(', ')}`);
                            }
                        });

                        // Check duplicate group IDs in item
                        const dupGroups = getDuplicates(groupIds);
                        if (dupGroups.length > 0) {
                            errors.push(`Duplicate optionGroup IDs in item ${itemRef}: ${dupGroups.join(', ')}`);
                        }
                    }
                }
            });
        });

        // Check duplicate Category IDs
        const dupCats = getDuplicates(categoryIds);
        if (dupCats.length > 0) {
            errors.push(`Duplicate category IDs: ${dupCats.join(', ')}`);
        }

        // Check duplicate Item IDs (globally)
        const dupItems = getDuplicates(itemIds);
        if (dupItems.length > 0) {
            errors.push(`Duplicate item IDs found across menu: ${dupItems.join(', ')}`);
        }

        if (errors.length > 0) {
            return printErrors(errors);
        }

        console.log("✅ Validation SUCCESS: menu.json is correctly formatted.");
        process.exit(0);

    } catch (err) {
        console.error(`ERROR: Could not read or parse file: ${err.message}`);
        process.exit(1);
    }
}

function getDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) !== index && arr.indexOf(item) === index); // Return unique duplicates
}

function printErrors(errors) {
    console.error("❌ Validation FAILED with the following errors:");
    errors.forEach(err => console.error(`- ${err}`));
    process.exit(1);
}

validateMenu();
