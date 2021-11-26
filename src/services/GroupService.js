const Group = require('../models/groupModel');
const Category = require('../models/categoryModel');
const categoryService = require('./CategoryService');
//const Category = require('../models/categoryModel');

//Lấy cate cho tất cả các trang {admin}
const getGroup = async (Status) => {
  try {
    const group = await Group.find({ Status: Status });
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
    const name = await Group.findOne({ Name });
    //const check = group.findOne({_id:Id});
    if (group) {
      return {
        msg: 'GroupId đã tồn tại!',
        statusCode: 300,
      };
    }
    if (name) {
      return {
        msg: 'Tên nhóm đã tồn tại!',
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
        msg: 'Thêm nhóm thành công!',
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
    const name = await Group.findOne(Name);

    if (name) {
      return {
        msg: 'Tên nhóm đã tồn tại!',
        statusCode: 300,
      };
    }
    await Group.findOneAndUpdate({ _id: Id }, Name);
    const Status = true;
    const data = (await getGroup(Status)).data;
    console.log(data);
    if (data) {
      return {
        msg: 'Chỉnh sửa nhóm ' + Id + ' thành công!',
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
//Chỉnh sửa status group thành true ~ khôi phục lại group
const changeStatusGroup = async (Status, Id) => {
  try {
    //Lấy Cate theo groupId
    const GroupId = Id;
    const category = await Category.find({});
    let group = category[0].Group;
    let lstCate = group.find((x) => x.id === GroupId);
    if (lstCate) {
      lstCate = lstCate.Category;
      //Đổi status ở cate
      for (const i in lstCate) {
        let CateId = lstCate[i].id;
        await categoryService.changeStatusCate({ GroupId, Status }, CateId);
      }
    }

    await Group.findOneAndUpdate({ _id: Id }, { Status: Status });

    let message = 'Xóa nhóm ' + Id + ' thành công!';

    if (String(Status) === 'true') {
      message = 'Khôi phục nhóm ' + Id + ' thành công!';
    }
    //Xóa group thì đang ở gruop đã duyệt
    //Khôi phục thì đang ở group đã xóa
    Status != Status;
    let data = (await getGroup(Status)).data;
    if (data) {
      return {
        msg: message,
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
