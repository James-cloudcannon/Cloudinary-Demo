---
_schema: default
title: 'Expanding Images With Cloudinary’s Generative Fill: AI-Powered Outpainting'
breadcrumb_title:
description: >-
  Cloudinary's latest feature, Generative Fill, within the Programmable Media
  product, utilizes AI technology to seamlessly extend and enhance images,
  transforming vertical to horizontal orientations and satisfying various
  practical use cases.
draft: false
series:
image: >-
  https://res.cloudinary.com/cloudinary-marketing/images/c_fill,w_1539/f_auto,q_auto/v1687555016/Blog-generative-fill/Blog-generative-fill-jpg?_i=AA
date: 2024-01-29T05:02:00+13:00
hide_publish_date: false
tags:
  - AI
  - Features
author: 8be0c187-5378-43bd-9a1e-85ed1c49b51d
permalink: /blog/{{ title | slugify }}/
cta:
  title: Ready to start using Cloudinary?
  body_text: Create stunning visual experiences in minutes.
  button:
    content:
      link: '#'
      text: GET STARTED
    styles:
      style: outline
seo:
  open_graph_type: article
  featured_image: >-
    https://res.cloudinary.com/cloudinary-marketing/images/v1687555016/Blog-generative-fill/Blog-generative-fill-jpg?_i=AA
  featured_image_alt: 'Expanding Images With Cloudinary’s Generative Fill: AI-Powered Outpainting'
categories: 
  - features
  - ai
_inputs:
  title:
    comment: Keep under 70 characters.
  description:
    comment: Keep under 155 characters.
---
## Introduction

The latest Generative AI feature added to the Programmable Media product, Generative Fill, is here.

Building on the Generative Remove and [Generative Replace](https://cloudinary.com/documentation/effects_and_artistic_enhancements#generative_replace) capabilities, Generative Fill also leverages AI to expand and extend original images. This feature is especially valuable when transforming images from vertical to horizontal orientations by seamlessly blending the new AI- generated background with the existing content, which can satisfy many practical use cases.

Like all of the features of Cloudinary’s broad AI offerings, Generative Fill allows you to achieve creative possibilities programmatically, significantly, and at scale, reducing workflow time and increasing your content velocity.

Try out Generative Fill and other cutting-edge features at our new [Generative AI Playground](http://ai.cloudinary.com/).

## How It Works

Generative Fill works with Cloudinary’s padding crop modes and leverages the new `gen_fill` option for backgrounds (or `b_gen_fill` for the URL API). Combining these options allows users to achieve a visually pleasing fill that seamlessly matches the original image.

Moreover, Generative Fill allows users to add a natural language prompt to the `gen_fill` command, enhancing creative control over the generated background.

### Padding Crop Modes

The padding crop modes that work with generative fill backgrounds are:

**Pad.** Resizes asset with optional padding, maintaining aspect ratio and visibility.

**Limit Pad.** Scales down an asset with padding if larger than the specified limit, maintaining aspect ratio and visibility.

**Minimum Pad**. Adds padding to a smaller image to achieve a minimum width/height without scaling, maintaining the aspect ratio of the original.

**Fill Pad.** Prevents “bad crop” by using fill mode and adding padding if needed, must be used in conjunction with g\_auto.

**Note:** For more information, check out the [documentation](https://cloudinary.com/documentation/transformation_reference#b_gen_fill) or try the [demo](https://ai.cloudinary.com/demos/fill).

### Examples With Crop Modes

Below are some real examples of Generative Fill using our various padding crop modes. We’ll be using the same portrait/vertical image of a model with a width of 600 and a height of 900 to illustrate the differences between the modes when `b_gen_fill` is used:

![](https://res.cloudinary.com/demo/image/upload/v1688051275/ai/original.jpg)Original image, 600×900

#### Standard Padding (c\_pad)

Resizes assets with optional padding, maintaining aspect ratio and visibility of the original with the new areas generatively filled in. For this example, we’ve padded the original to a 1:1 aspect ratio:

![](https://res.cloudinary.com/demo/image/upload/v1688051275/ai/c_pad.jpg)

#### Limit Pad (c\_lpad)

Scales down an asset with padding if larger than the specified width/height limit, maintaining aspect ratio and visibility. The new areas will be generated around the scaled image as needed. Here we’ve created a 400×800 image from the original – the original is shrunk to fit, and new imagery is inserted, including feet!

![](https://res.cloudinary.com/demo/image/upload/v1688051275/ai/c_lpad.jpg)

#### Minimum Pad (c\_mpad)

Adds padding to an image if the image’s width **or** height is smaller than the specified dimensions than the original to achieve a minimum width/height without scaling, maintaining the aspect ratio of the original. Here, we’ve maintained the height of the original (900px) but increased the width to 1100px. The new areas to the left and right of the original have been created using Generative Fill.

![](https://res.cloudinary.com/demo/image/upload/v1688051275/ai/c_mpad.jpg)

#### Fill Pad (c\_fill\_pad)

Used with `g_auto`, this mode will attempt to prevent a pad crop by considering auto gravity and applying some padding as needed. Here, we’ve created a unique side banner crop of the image 500\*1200 and applied g\_auto. As you can see, the focus is on the woman and the trees; `b_gen_fill` adds lovely matching imagery to the top and bottom of the image to complete the crop.

![](https://res.cloudinary.com/demo/image/upload/v1688051275/ai/c_fill_pad.jpg)

For perspective, take a look at this short video which flows through the above examples to highlight how generative fill works with each of these padding modes:

### Behind the Scenes

Generative Fill harnesses the power of Cloudinary’s powerful generative AI technology, which combines diffusion models with the platform’s versatile cropping capabilities.

Generative Fill uses a process known as ***outpainting*** , which enables the expansion of images by adding content around the edges. This content smoothly blends with the existing picture, preserving the style and details of the original, resulting in a coherent and extended image.

When a user provides a natural language prompt, the AI considers this and will generate extending pixels that match the original and take the instructions into account.

## Use Cases

1. **More appealing crops and padding.** Users may include blank padding vertically or horizontally when an image is cropped to a specific aspect ratio. Generative Fill fills these blank pixels intelligently, resulting in a visually pleasing result. Whether creating product images for e-commerce platforms or fitting images into various design layouts, Generative Fill ensures a cohesive and visually engaging presentation.
2. **E-commerce.** Extend product images horizontally or vertically to fit the dimensions of product detail or listing pages seamlessly. This transformation ensures that the products are displayed consistently across different devices and platforms. Generative Fill helps enhance the visual appeal of product catalogs and detail pages. Combined with Cloudinary’s powerful optimization features, this can improve the overall shopping experience and, most importantly, conversion rates.
3. **Travel and hospitality.** Create stunning wide banner images by extending the dimensions horizontally. Generative Fill enables the creation of captivating hero images that draw users’ attention and showcase the beauty of travel destinations and resorts.
4. **Use with other Generative features.** Combining Generative Fill with Cloudinary’s other generative features like Generative Replace and Generative Remove increases the creative possibilities. These features work harmoniously, enabling users to craft the perfect image from a near-perfect original. Whether removing unwanted objects, replacing elements, or extending the image background, the mix of generative features unlocks limitless creative possibilities through our powerful Image and Video platform.

## Conclusion

Cloudinary’s Generative Fill is a powerful feature that expands the possibilities of image manipulation and creativity. By utilizing the power of generative AI technology, users can seamlessly extend and develop images, creating visually appealing results that preserve the style and details of the original content. Whether for e-commerce, travel, or other industries, Generative Fill empowers users to take their visual storytelling to the next level through Programmable Media. With Cloudinary’s suite of generative features, you can achieve automated creative possibilities that seemed impossible a short time ago.