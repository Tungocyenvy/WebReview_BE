const Category = require('../models/categoryModel');
const Group = require('../models/groupModel');

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
//Tạo id cho cate
const getCateId = (CateName) => {
  let res = CateName.split(' ');
  let result = '';
  for (const i in res) {
    result = result + res[i].charAt(0);
  }
  return result;
};

//Lấy cate theo từng trang
const getCategorybyGroupId = async (body) => {
  let { GroupId } = body;
  //const Id = 'Review';
  try {
    const category = (await getCategory()).data;
    let post = category.find((x) => x.id === GroupId);
    console.log('post' + post);

    if (post.length <= 0) {
      return {
        msg: 'Không có category nào!',
        statusCode: 300,
      };
    } else {
      return {
        msg: 'Lấy tất cả category của ' + GroupId + ' thành công!',
        statusCode: 200,
        data: post,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//Lấy cate cho tất cả các trang {admin}
const getCategory = async () => {
  //const Id = 'Review';
  console.log('getCategory');
  try {
    const category = await Category.find({});

    const data = category[0].Group;
    let Result = [];
    //Lấy tên Category
    for (const i in data) {
      let group = await Group.findOne({ _id: data[i].id });
      let cate = {};
      cate.id = data[i].id;
      cate.Name = group.Name;
      cate.Category = data[i].Category;
      Result.push(cate);
    }

    console.log(Result);
    return {
      msg: 'Lấy tất cả category thành công!',
      statusCode: 200,
      data: Result,
    };
    // }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//Thêm category
const createCategory = async (body) => {
  let { GroupId, CateName } = body;
  try {
    const category = await Category.find({});
    const _id = category[0]._id;
    let group = category[0].Group;
    let data = group.find((x) => x.id === GroupId);
    console.log(data);

    if (data.length <= 0) {
      return {
        msg: 'GroupId không tồn tại!',
        statusCode: 300,
      };
    }

    //Tạo id cho cate
    let id = getCateId(CateName);
    //check id có trùng hay không
    let check = data.Category.find((x) => x.id === id);
    while (check) {
      const randomIndex = getRandomInt(0, 10);
      id = id + randomIndex;
      check = data.Category.find((x) => x.id === id);
    }

    let tmp = { id: id, Name: CateName };
    data.Category.push(tmp);
    group = group.map((x) => (x.id === GroupId ? data : x));
    await Category.findOneAndUpdate({ _id }, { Group: group });
    const resave = (await getCategory()).data;
    console.log(resave);
    if (resave) {
      return {
        msg: 'Thêm category thành công!',
        statusCode: 200,
        data: resave,
      };
    }
    // }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình thêm thông tin',
      statusCode: 300,
    };
  }
};

//Sửa category
const updateCategory = async (body, CateId) => {
  let { GroupId, CateName } = body;
  //let {CateId}=CateId;
  console.log(CateId);
  try {
    const category = await Category.find({});
    const _id = category[0]._id;
    let group = category[0].Group;
    let data = group.find((x) => x.id === GroupId);
    console.log(data);

    if (data.length <= 0) {
      return {
        msg: 'GroupId không tồn tại!',
        statusCode: 300,
      };
    }
    let tmp = { id: CateId, Name: CateName };

    let cate = data.Category;
    cate = cate.map((x) => (x.id === CateId ? tmp : x));
    data.Category = cate;
    group = group.map((x) => (x.id === GroupId ? data : x));
    await Category.findOneAndUpdate({ _id }, { Group: group });
    const resave = (await getCategory()).data;
    console.log(resave);
    if (resave) {
      return {
        msg: 'Chỉnh sửa category' + CateId + 'thành công!',
        statusCode: 200,
        data: resave,
      };
    }
    // }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình thêm thông tin',
      statusCode: 300,
    };
  }
};

//xóa category
const deleteCategory = async (body, CateId) => {
  let { GroupId } = body;
  console.log(GroupId);
  try {
    const category = await Category.find({});
    const _id = category[0]._id;
    let group = category[0].Group;
    let data = group.find((x) => x.id === GroupId);
    console.log(data);

    if (data.length <= 0) {
      return {
        msg: 'GroupId không tồn tại!',
        statusCode: 300,
      };
    }
    //let tmp = { "id": CateId, "Name": CateName };

    let cate = data.Category;
    //items.findIndex(element => element.id === item.id)
    //cate = ;
    cate.splice(
      cate.findIndex((x) => x.id === CateId),
      1,
    );
    console.log(cate);
    data.Category = cate;
    group = group.map((x) => (x.id === GroupId ? data : x));
    await Category.findOneAndUpdate({ _id }, { Group: group });
    const resave = (await getCategory()).data;
    console.log(resave);
    if (resave) {
      return {
        msg: 'xóa ' + CateId + ' thành công!',
        statusCode: 200,
        data: resave,
      };
    }
    // }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình xóa',
      statusCode: 300,
    };
  }
};

module.exports = {
  getCategorybyGroupId,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
