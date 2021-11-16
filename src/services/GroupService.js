const Group = require('../models/groupModel');
const categoryService = require('./CategoryService');
const Category = require('../models/categoryModel');

//Lấy cate cho tất cả các trang {admin}
const getGroup = async () => {
  try {
    const group = await Group.find({});
    return {
      msg: 'Lấy tất cả group thành công!',
      statusCode: 200,
      data: group,
    };
    // }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình lấy thông tin',
      statusCode: 300,
    };
  }
};

//Thêm group
const createGroup = async (body) => {
  let { Id, Name } = body;
  try {
    const group = await Group.findOne({ _id: Id });
    //const check = group.findOne({_id:Id});
    if (group) {
      return {
        msg: 'GroupId đã tồn tại!',
        statusCode: 300,
      };
    }
    const newGroup = new Group({
      _id: Id,
      Name,
    });
    const resave = await newGroup.save();
    console.log(resave);
    if (resave) {
      return {
        msg: 'Thêm group thành công!',
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

//Sửa group
const updateGroup = async (Name, Id) => {
  try {
    await Group.findOneAndUpdate({ _id: Id }, Name);
    const data = (await getGroup()).data;
    console.log(data);
    if (data) {
      return {
        msg: 'Chỉnh sửa Group ' + Id + ' thành công!',
        statusCode: 200,
        data: data,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình thêm thông tin',
      statusCode: 300,
    };
  }
};

//Chỉnh sửa status group thành false ~ xóa group
const changeStatusGroup = async (Id) => {
  try {
    const GroupId = Id;
    await Group.findOneAndUpdate({ _id: Id }, { Status: false });

    //Lấy Cate theo groupId
    let lstCate = (await categoryService.getCategorybyGroupId({ GroupId }))
      .data;
    lstCate = lstCate.Category;

    //Đổi status ở cate
    for (const i in lstCate) {
      let CateId = lstCate[i].id;
      await categoryService.changeStatusCate({ GroupId }, CateId);
    }

    const data = (await getGroup()).data;
    if (data) {
      return {
        msg: 'Chỉnh xóa Group ' + Id + ' thành công!',
        statusCode: 200,
        data: data,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình thêm thông tin',
      statusCode: 300,
    };
  }
};
//Xóa Group
/** Bỏ chuyển qua change status*/
/*const deleteGroup = async (Id) => {
  try {
    await Group.findOneAndDelete({ _id: Id });
    const data = (await getGroup()).data;
    console.log(data);
    if (data) {
      return {
        msg: 'Xóa Group ' + Id + ' thành công!',
        statusCode: 200,
        data: data,
      };
    }
  } catch {
    return {
      msg: 'Xảy ra lỗi trong quá trình xóa',
      statusCode: 300,
    };
  }
};*/

module.exports = {
  getGroup,
  createGroup,
  updateGroup,
  changeStatusGroup,
};
